import React from 'react';
import './Calendar.css'; // Create a CSS file for styling

const Calendar = ({ appointments, onClose }) => {
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Trainer's Calendar</h2>
        <button onClick={onClose}>Close Calendar</button>
      </div>
      <div className="calendar-body">
        {appointments.map((appointment, index) => (
          <div key={index} className="calendar-appointment">
            <span>{new Date(appointment.date).toLocaleString()}</span>
            <span>{appointment.clientName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
