import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import UserContext from '../context/user/UserContext';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Calendar({setFocusEvent, trigger}) {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const getAllEvents = async () => {
    await axios.get(`http://localhost:8000/api/task_user/${user?.id}`)
    .then((response) => {
      const formattedEvents = response.data.map(event => ({
        id : event.id,
        title: event.title,
        start: event.start_date_time,
        status : event.status,
        end: event.due_date_time,
        description: event.description,
        color : event.status === 'pending' ? 'paleblue' : 'seagreen'
      }));
      setEvents(formattedEvents);
    })
    .catch((error) => {
      console.log("Failed", error.response);
    });
  };

  useEffect(() => {
    if (user) {
      getAllEvents();
    }
  },[user, trigger]);

  function handleEventClick(clickInfo) {
      const event = {
          id: clickInfo.event.id,
          title: clickInfo.event.title,
          description: clickInfo.event.extendedProps.description, 
          start: clickInfo.event.start,
          end: clickInfo.event.end,
          status: clickInfo.event.extendedProps.status, 
      };
      toast.info("Please edit event");
      setFocusEvent(event);
  }

  function  handleDateSelect(selectInfo) {
    toast.info("Please edit event");
    setFocusEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
  }

  const handleEventDrop = async (dropInfo) => {
    toast.success("Event updated successfully!");
    const updatedEvent = {
      id: dropInfo.event.id,
      start_date_time: dropInfo.event.start.toISOString(),
      due_date_time: dropInfo.event.end ? dropInfo.event.end.toISOString() : null,
      assigned_to : user.id,
      description : dropInfo.event.extendedProps.description,
      title : dropInfo.event.title
    };

    await axios.put(`http://localhost:8000/api/task/${updatedEvent.id}/`, updatedEvent)
      .then(() => {
        getAllEvents();
      })
      .catch((error) => {
        console.log("Failed to update event", error.response);
      });
  };

  return (
    <FullCalendar
      ref={calendarRef}  
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
      timeZone="local"  
      events={events}
      eventClick={handleEventClick}
      height={590}
      aspectRatio={1}
      editable="true"
      selectable="true"
      headerToolbar={{
        left: 'prev,next today', 
        center: 'title',          
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' 
      }}
      themeSystem="standard"
      select={handleDateSelect} 
      eventDrop={handleEventDrop}
    />

  );
}
