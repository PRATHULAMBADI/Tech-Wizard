import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from './styles';

const UserHomePage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/organizer-home'); 
      console.log('Response:', response.data);
      setPrograms(response.data);
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
    <Container>
      <h1>Welcome to user Home!</h1>
      <Button onClick={handleLogout}>Logout</Button>
      {programs.length > 0 ? (
      <ul>
        {programs.map((program) => (
          <li key={program._id}>{program.name}-{program.posterUrl} </li>
          
        ))}
      </ul>
      ) : (
        <p>No Upcoming Programs</p>
      )}
    </Container>
  );
};


export default UserHomePage;