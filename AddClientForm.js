import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddClientForm.css'
const AddClientForm = ({ onAddClient }) => {
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    location: '',
  });

  const [appointmentDate, setAppointmentDate] = useState(null);

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    if (newClient.firstName && newClient.lastName) {
      onAddClient({ ...newClient, appointments: [] });
      setNewClient({
        firstName: '',
        lastName: '',
        location: '',
      });
    } else {
      alert('Please enter first name and last name.');
    }
  };

  const handleAddAppointment = () => {
    if (appointmentDate) {
      setNewClient((prevClient) => ({
        ...prevClient,
        appointments: [...prevClient.appointments, appointmentDate],
      }));
      setAppointmentDate(null);
    } else {
      alert('Please select a valid date and time for the appointment.');
    }
  };

  return (
     <div className="add-client-form-container">
       
      <h2>Add New Client</h2>
      <label>First Name:</label>
      <input type="text" name="firstName" value={newClient.firstName} onChange={handleInputChange} />
      <label>Last Name:</label>
      <input type="text" name="lastName" value={newClient.lastName} onChange={handleInputChange} />
      <label>Location:</label>
      <input type="text" name="location" value={newClient.location} onChange={handleInputChange} />
      <button onClick={handleAddClient}>Add Client</button>

      <h3>Add Appointment</h3>
      <DatePicker
        selected={appointmentDate}
        onChange={(date) => setAppointmentDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <button onClick={handleAddAppointment}>Add Appointment</button>
    </div>
  );
};

export default AddClientForm;
