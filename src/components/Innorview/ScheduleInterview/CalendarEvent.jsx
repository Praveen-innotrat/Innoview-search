import React, { useState } from 'react';
import axios from 'axios';

const CalendarEvent = () => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const meetingDetails = {
      name: meetingName,
      date: meetingDate,
      time: meetingTime,
      email: email,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/schedule-meeting', meetingDetails);
      console.log('Meeting scheduled:', response.data);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Meeting Name:</label>
        <input
          type="text"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Schedule Meeting</button>
    </form>
  );
};

export default CalendarEvent;
