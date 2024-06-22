import React, { useState, useEffect } from 'react';
import axios from 'axios';



const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user-getData'); 
      console.log('Response:', response.data);
      setUsers(response.data);
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
      <h1>Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name} - {user.email} - {user.mobile}</li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </BackgroundContainer>
  );
};

export default UserDetails;
