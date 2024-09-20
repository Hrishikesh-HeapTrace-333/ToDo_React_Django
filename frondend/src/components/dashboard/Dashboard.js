import React, {  useState } from 'react';
import '../../App.css'; 
import Calendar from '../calendar/Calendar';
import EventViewer from '../eventViewer/EventViewer';

function Dashboard() {
  const [focusEvent, setFocusEvent] = useState({});
  const [trigger, setTrigger] = useState(false);

  return (
    <div className="containerCalendar flex flex-col md:flex-row gap-6 p-4">
      <div className="flex-[3.5] shadow-lg rounded-lg p-4 bg-white">
        <Calendar setFocusEvent={setFocusEvent} trigger={trigger}/>
      </div>
      <div className="flex-[1.5] shadow-lg rounded-lg p-4 bg-white">
        <EventViewer focusEvent={focusEvent} setTrigger={setTrigger} />
      </div>
    </div>
  );
}

export default Dashboard;
