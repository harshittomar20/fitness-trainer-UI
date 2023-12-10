import React, { useState } from 'react';

const EditClientInlineForm = ({ client, onEditClient, onCancel }) => {
  const [editedFirstName, setEditedFirstName] = useState(client.firstName);
  const [editedLastName, setEditedLastName] = useState(client.lastName);
  const [editedLocation, setEditedLocation] = useState(client.location);

  const handleEditClient = () => {
    const editedClientData = {
      firstName: editedFirstName,
      lastName: editedLastName,
      location: editedLocation,
    };

    onEditClient(editedClientData);
  };

  const handleCancelEdit = () => {
    onCancel();
  };

  return (
    <div>
      <label>Edit First Name:</label>
      <input value={editedFirstName} onChange={(e) => setEditedFirstName(e.target.value)} />

      <label>Edit Last Name:</label>
      <input value={editedLastName} onChange={(e) => setEditedLastName(e.target.value)} />

      <label>Edit Location:</label>
      <input value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} />

      <button onClick={handleEditClient}>Save Changes</button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
};

export default EditClientInlineForm;
