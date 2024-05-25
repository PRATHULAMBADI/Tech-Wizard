import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  OrganizerHomePageLIImg,
  OrganizerHomePageLIHeading,
  OrganizerHomePageLIText,
  Container,
  Button,
  OrganizerHomePageContainer,
  OrganizerHomePageUL,
  OrganizerHomePageLI,
  OrganizerHomePageLIEditButton
} from './styles';

const OrganizerHomePage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3000/organizer-home', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data);
      setPrograms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Error fetching programs. Please try again later.');
      setLoading(false);
    }
  };

  const handleAddNewProgramClick = () => {
    navigate('/program-addNew');
  };

  const handleEditProgramClick = (programId) => {
    navigate(`/program-edit/${programId}`);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleDeleteProgram = async (programId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3000/program-delete/${programId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPrograms(programs.filter((program) => program._id !== programId));
    } catch (error) {
      console.error('Error deleting program:', error);
      setError('Error deleting program. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <OrganizerHomePageContainer>
      <Container>
        <h1>Welcome to Organizer!</h1>
        <Button onClick={handleAddNewProgramClick}>Add New Program</Button>
        <Button onClick={handleLogout}>Logout</Button>
        <div>
          {programs.length > 0 ? (
            <OrganizerHomePageUL>
              {programs.map((program) => (
                <OrganizerHomePageLI key={program._id}>
                  <OrganizerHomePageLIImg src={program.posterUrl} alt={program.name} />
                  <OrganizerHomePageLIHeading>
                    {program.name}
                  </OrganizerHomePageLIHeading>
                  <OrganizerHomePageLIText>
                    Conducted by: {program.conductingPerson}<br />
                    Venue: {program.venue}<br />
                    Date & Time: {new Date(program.dateTime).toLocaleString()}<br />
                    Duration: {program.duration}<br />
                    <a href={program.registrationLink}>Register Here</a><br />
                    {program.otherLinks?.website && <a href={program.otherLinks.website}>Website</a>}<br />
                    {program.otherLinks?.facebook && <a href={program.otherLinks.facebook}>Facebook</a>}<br />
                    {program.otherLinks?.instagram && <a href={program.otherLinks.instagram}>Instagram</a>}<br />
                  </OrganizerHomePageLIText>
                  <OrganizerHomePageLIEditButton>
                    <Button onClick={() => handleEditProgramClick(program._id)}>Edit Details</Button>
                    <Button onClick={() => handleDeleteProgram(program._id)}>Delete</Button>
                  </OrganizerHomePageLIEditButton>
                </OrganizerHomePageLI>
              ))}
            </OrganizerHomePageUL>
          ) : (
            <p>No Upcoming Programs</p>
          )}
        </div>
      </Container>
    </OrganizerHomePageContainer>
  );
};

export default OrganizerHomePage;
