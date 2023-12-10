import React, { useState } from 'react';
import './Clients.css';
import './Calendar.css';
import './Notification.css';
import AddClientForm from './AddClientForm';
import EditAppointmentForm from './EditAppointmentForm';
import EditClientInlineForm from './EditClientInlineForm';
import DeleteAppointment from './DeleteAppointment';
import Notification from './Notification';
import Calendar from './Calendar';

const Clients = () => {
  const [clientsData, setClientsData] = useState([
     {
      id: 1,
      firstName: 'Client 1',
      lastName: 'Last 1',
      location: 'Location 1',
      appointments: [
        new Date('2023-12-15T10:00:00'), // Sample appointment date and time
        new Date('2023-12-16T14:30:00'), // Sample appointment date and time
      ],
    },
    {
      id: 2,
      firstName: 'Client 2',
      lastName: 'Last 2',
      location: 'Location 2',
      appointments: [
        new Date('2023-12-17T09:00:00'), // Sample appointment date and time
      ],
    },
  ]);

  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isEditingAppointment, setIsEditingAppointment] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [isDeletingAppointment, setIsDeletingAppointment] = useState(false);
  const [isShowingCalendar, setIsShowingCalendar] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleInitiateDeleteAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDeletingAppointment(true);
  };

  const handleDeleteAppointment = () => {
    const updatedClientsData = clientsData.map((client) => ({
      ...client,
      appointments: client.appointments.filter((apt) => apt !== selectedAppointment),
    }));
    setClientsData(updatedClientsData);
    setIsDeletingAppointment(false);
    showNotification('success', 'Appointment deleted successfully.');
  };

  const handleCloseCalendar = () => {
    setIsShowingCalendar(false);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleEditAppointment = (clientId) => {
    setSelectedClientId(clientId);
    setIsEditingAppointment(true);
  };
  // Sample appointments data
  const sampleAppointments = [
    { id: 1, date: new Date('2023-12-15T09:00:00') },
    { id: 2, date: new Date('2023-12-16T14:30:00') },
    // Add more appointments as needed
  ];


  return (
    <div className="clients-container">
      {/* Add Client Form */}
      {isAddingClient && (
        <AddClientForm
          onAddClient={(newClient) => {
            setClientsData([...clientsData, newClient]);
            setIsAddingClient(false);
            showNotification('success', 'Client added successfully.');
          }}
          onCancel={() => setIsAddingClient(false)}
        />
      )}

      {/* Edit Appointment Form */}
      {isEditingAppointment && selectedClientId && (
        <EditAppointmentForm
          existingAppointments={clientsData.find((client) => client.id === selectedClientId)?.appointments || []}
          onEditAppointment={(editedAppointments) => {
            const updatedClientsData = clientsData.map((client) => {
              if (client.id === selectedClientId) {
                return { ...client, appointments: editedAppointments };
              }
              return client;
            });
            setClientsData(updatedClientsData);
            setIsEditingAppointment(false);
            showNotification('success', 'Appointment updated successfully.');
          }}
          onCancel={() => setIsEditingAppointment(false)}
        />
      )}

      {/* Edit Client Inline Form */}
      {isEditingClient && selectedClientId && (
        <EditClientInlineForm
          client={clientsData.find((client) => client.id === selectedClientId)}
          onEditClient={(editedClient) => {
            const updatedClientsData = clientsData.map((client) => {
              if (client.id === selectedClientId) {
                return { ...client, ...editedClient };
              }
              return client;
            });
            setClientsData(updatedClientsData);
            setIsEditingClient(false);
            showNotification('success', 'Client updated successfully.');
          }}
          onCancel={() => setIsEditingClient(false)}
        />
      )}

      {/* Delete Appointment Confirmation */}
      {isDeletingAppointment && selectedAppointment && (
        <DeleteAppointment
          appointment={selectedAppointment}
          onDelete={() => {
            handleDeleteAppointment();
            setIsDeletingAppointment(false);
            showNotification('success', 'Appointment deleted successfully.');
          }}
          onCancel={() => setIsDeletingAppointment(false)}
        />
      )}

      {/* Render Clients */}
      {clientsData.map((client) => (
        <div key={client.id} className="client-card">
          {/* Display client details */}
          <div>
            <label>First Name:</label>
            <span>{client.firstName}</span>
          </div>
          <div>
            <label>Last Name:</label>
            <span>{client.lastName}</span>
          </div>
          <div>
            <label>Location:</label>
            <span>{client.location}</span>
          </div>

          {/* Display appointments */}
          <div>
            <label>Appointments:</label>
            <ul>
              {client.appointments.length > 0 ? (
                client.appointments.map((appointment, index) => (
                  <li key={index}>
                    {new Date(appointment).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    })}
                    <button onClick={() => handleInitiateDeleteAppointment(appointment)}>Delete</button>
                  </li>
                ))
              ) : (
                <li>No appointments scheduled</li>
              )}
            </ul>
          </div>

          {/* Edit and Delete buttons */}
          <div>
            <button onClick={() => handleEditAppointment(client.id)}>Edit Appointment</button>
            <button onClick={() => setIsEditingClient(true)}>Edit Client</button>
          </div>
        </div>
      ))}

      {/* Show Calendar Button */}
      <button onClick={() => setIsShowingCalendar(true)}>Show Calendar</button>

      {/* Notification Component */}
      {notification && <Notification type={notification.type} message={notification.message} />}

      {/* Calendar Component */}
      {isShowingCalendar && <Calendar appointments={sampleAppointments} onClose={handleCloseCalendar} />}
    </div>
  );
};

export default Clients;
