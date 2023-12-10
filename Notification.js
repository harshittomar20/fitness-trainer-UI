import React from 'react';
import './Notification.css'; // Create a CSS file for styling

const Notification = ({ type, message }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
