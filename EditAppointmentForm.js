// src/components/Clients/EditAppointmentForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditAppointmentForm = ({ existingAppointments, onEditAppointment }) => {
  const [editedAppointments, setEditedAppointments] = useState([...existingAppointments]);
  const [editedAppointmentDate, setEditedAppointmentDate] = useState(null);

  const handleEditAppointment = () => {
    onEditAppointment(editedAppointments);
    setEditedAppointments([]);
    setEditedAppointmentDate(null);
  };

  return (
    <div>
      <h3>Edit Appointments</h3>
      {existingAppointments.map((appointment, index) => (
        <div key={index}>
          <span>{appointment.toString()}</span>
        </div>
      ))}
      <DatePicker
        selected={editedAppointmentDate}
        onChange={(date) => setEditedAppointmentDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <button onClick={() => setEditedAppointments([...editedAppointments, editedAppointmentDate])}>
        Add Edited Appointment
      </button>
      <button onClick={handleEditAppointment}>Save Changes</button>
    </div>
  );
};

export default EditAppointmentForm;
