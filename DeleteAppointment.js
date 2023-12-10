import React from 'react';
const DeleteAppointment = ({ appointment, onDelete, onCancel }) => {
  return (
    <div>
      <p>Are you sure you want to delete the appointment:</p>
      <p>{appointment.toString()}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteAppointment;
