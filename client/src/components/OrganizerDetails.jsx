import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BackgroundContainer } from './styles';

const OrganizerDetails = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/organizer-getData'); 
      console.log('Response:', response.data);
      setOrganizers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <BackgroundContainer>
      <h1>Organizer Details</h1>
      {organizers.length > 0 ? (
        <ul>
          {organizers.map((organizer) => (
            <li key={organizer._id}>{organizer.username} - {organizer.email} - {organizer.password}</li>
          ))}
        </ul>
      ) : (
        <p>No organizers found.</p>
      )}
    </BackgroundContainer>
  );
};

export default OrganizerDetails;
