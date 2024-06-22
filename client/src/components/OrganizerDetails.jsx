import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
`;

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const OrganizerDetails = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/organizer-getData');
      console.log('Response:', response.data);
      setOrganizers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching organizers:', error);
      setError('Error fetching organizers. Please try again later.');
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
        <ListContainer>
          {organizers.map((organizer) => (
            <ListItem key={organizer._id}>
              <strong>{organizer.name}</strong> - {organizer.email} -
              {/* Uncomment the line below to display actual passwords if necessary */}
              Password: {organizer.password}
            </ListItem>
          ))}
        </ListContainer>
      ) : (
        <p>No organizers found.</p>
      )}
    </BackgroundContainer>
  );
};

export default OrganizerDetails;
