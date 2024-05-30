import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  StyledHomeIcon,
  StyledLogoutIcon,
  Button,
  ExtentedButton,
  ExtentedButtonContainer,
  ButtonContainer,
  BackgroundContainer,
  Container,
  ContainerHeading,
  Tile,
  TileContainer,
  TileImage,
  TileHeading,
  TileContent,
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
      const response = await axios.get('http://localhost:3000/user-home', {
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

  const handleIncludeToProgram = () => {
    navigate('/user-home');
  };

  const handleDashboard = () => {
    navigate('/user-getData');
  };
  
  const handleGoToHome = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/user-login');
  };

  const handleExcludeFromProgram = async (programId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3000/program-delete/${programId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // setPrograms(programs.filter((program) => program._id !== programId));
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
    <BackgroundContainer>
      <Container>
        <ContainerHeading>Welcome to User!</ContainerHeading>
        <ExtentedButtonContainer>          
          <ExtentedButton onClick={handleGoToHome}><StyledHomeIcon/></ExtentedButton>
          <ExtentedButton onClick={handleLogout}><StyledLogoutIcon/></ExtentedButton>
        </ExtentedButtonContainer>
        <ButtonContainer>
          <Button onClick={handleDashboard}>User Dashboard</Button>
        </ButtonContainer>
        <div>
          {programs.length > 0 ? (
            <TileContainer>
              {programs.map((program) => (
                <Tile key={program._id}>
                  <TileImage src={program.posterUrl} alt={program.name} />
                  <TileHeading>
                    {program.name}
                  </TileHeading>
                  <TileContent>
                    Conducted by: {program.conductingPerson}<br />
                    Venue: {program.venue}<br />
                    Date & Time: {new Date(program.dateTime).toLocaleString()}<br />
                    Duration: {program.duration}<br />
                    <a href={program.registrationLink}>Register Here</a><br />
                    {program.otherLinks?.website && <a href={program.otherLinks.website}>Website</a>}<br />
                    {/* {program.otherLinks?.facebook && <a href={program.otherLinks.facebook}>Facebook</a>}<br />
                    {program.otherLinks?.instagram && <a href={program.otherLinks.instagram}>Instagram</a>}<br /> */}
                  </TileContent>
                  <ButtonContainer>
                    <Button onClick={() => handleIncludeToProgram(program._id)}>Include Me</Button>
                    {/* <Button onClick={() => handleExcludeFromProgram(program._id)}>Exclude Me</Button> */}
                  </ButtonContainer>
                </Tile>
              ))}
            </TileContainer>
          ) : (
            <p>No Upcoming Programs</p>
          )}
        </div>
      </Container>
    </BackgroundContainer>
  );
};

export default OrganizerHomePage;
