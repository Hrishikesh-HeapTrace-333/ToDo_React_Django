import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './EventViewer.css'; 
import UserContext from '../context/user/UserContext';
import { toast } from 'react-toastify';

function EventViewer({ focusEvent, setTrigger }) {
  const { user } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      start: '',
      end: '',
      allDay: false,
    },
  });

  useEffect(() => {
    if (focusEvent) {
      reset({
        title: focusEvent.title || '',
        description: focusEvent.description || '',
        start: focusEvent.start ? new Date(focusEvent.start).toISOString().slice(0, 16) : '',
        end: focusEvent.end ? new Date(focusEvent.end).toISOString().slice(0, 16) : '',
        status: focusEvent.status || '',
      });
    }
  }, [focusEvent, reset]);

  const updateEvent = async (formData) => {
    await axios.put(`http://localhost:8000/api/task/${focusEvent.id}/`, formData)
      .then(() => {
        setTrigger((prev) => !prev);
        toast.success('Event updated successfully!');
      })
      .catch((error) => {
        console.log("Update failed", error.response);
        toast.error('Failed to update event. Please try again.');
      });
  }

  const addEvent = async (formData) => {
    await axios.post(`http://localhost:8000/api/task/`, formData)
     .then(() => {
        setTrigger((prev) => !prev); 
        toast.success('Event added successfully!');
      })
     .catch((error) => {
        console.log("Add Failed", error.response);
        toast.error('Failed to add event. Please try again.');
      });
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('start_date_time', data.start);
    formData.append('due_date_time', data.end);
    formData.append('assigned_to', user.id);
    formData.append('status', data.status);

    if (focusEvent.id) {
      updateEvent(formData);
    } else {
      addEvent(formData);
    }
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8000/api/task/${focusEvent.id}/`)
      .then(() => {
        setTrigger((prev) => !prev); 
        toast.success('Event deleted successfully!');
        reset()
      })
      .catch((error) => {
        console.log("Failed", error.response);
        toast.error('Failed to delete event. Please try again.');
        reset()
      });
  };

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="event-viewer-container p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`mt-1 block w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <input
            type="text"
            {...register('description', { required: 'Description is required' })}
            className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Start:</label>
            <input
                type="datetime-local"
                {...register('start', { required: 'Start time is required' })}
                defaultValue={focusEvent.start ? new Date(focusEvent.start).toISOString().slice(0, 16) : ''}
                className={`mt-1 block w-full p-2 border ${errors.start ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.start && <p className="text-red-500 text-sm">{errors.start.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">End:</label>
            <input
                type="datetime-local"
                {...register('end', { required: 'End time is required' })}
                defaultValue={focusEvent.end ? new Date(focusEvent.end).toISOString().slice(0, 16) : ''}
                className={`mt-1 block w-full p-2 border ${errors.end ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.end && <p className="text-red-500 text-sm">{errors.end.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="flex items-center mt-2">
                <label className="mr-4">
                    <input
                        type="radio"
                        value="pending"
                        {...register('status', { required: 'Status is required' })}
                        className="mr-2"
                        checked={focusEvent.status === 'pending' || focusEvent.status === undefined}
                        />
                    Pending
                </label>
                <label>
                    <input
                        type="radio"
                        value="completed"
                        {...register('status')}
                        className="mr-2"
                        checked={focusEvent.status === 'completed'}
                        />
                    Completed
                </label>
            </div>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        <div className="flex justify-between">
            <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                Save Changes
            </button>

            <button
                type="button"
                className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleDelete}
                >
                Delete Event
            </button>
        </div>
        </form>
    </>
  );
}

export default EventViewer;
