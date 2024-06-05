import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  StyledHomeIcon,
  StyledLogoutIcon,
  Button,
  IconsHolder,
  ButtonContainer,
  BackgroundContainer,
  Container,
  ContainerHeading,
  Tile,
  TileLabel,
  TileContainer,
  TileImage,
  TileHeading,
  TileContent,
  TileDetails,
  UserRegiteredPrograms,
  Details,
  Search,
  ProgramNotFound,
  DisabledButton,
  IconsContainer,
  IconLabel,
  IconsHolderStyledHomeIcon,
  IconsHolderUserRegiteredPrograms,
  IconsHolderStyledLogoutIcon,
  IconsHolderSearch
} from './styles';

const UserHomePage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
      const registeredResponse = await axios.get('http://localhost:3000/user-registered-programs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const registeredPrograms = registeredResponse.data.registeredPrograms.map(p => p._id);
      const programsData = response.data.map(program => ({
        ...program,
        isIncluded: registeredPrograms.includes(program._id)
      }));

      setPrograms(programsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Error fetching programs. Please try again later.');
      setLoading(false);
    }
  };

  const handleDashboard = () => {
    navigate('/user-Dashboard');
  };

  const handleGoToHome = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/user-login');
  };

  const handleDate = (dateTime) => {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleDateString();
  };

  const handleTime = (dateTime) => {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleTimeString();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleIncludeToProgram = async (programId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`http://localhost:3000/user-dashboard/${programId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPrograms(prevPrograms => prevPrograms.map(program => 
          program._id === programId ? { ...program, isIncluded: true } : program
        ));
        alert('Successfully registered to the program');
      } else {
        alert('Failed to register to the program');
      }
    } catch (error) {
      console.error('Error registering to program:', error);
      alert('Error registering to the program. Please try again later.');
    }
  };

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.conductingPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    handleDate(program.dateTime).includes(searchQuery) ||
    handleTime(program.dateTime).includes(searchQuery) ||
    program.duration.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <IconsContainer>            
          <IconsHolder>
            <IconsHolderStyledHomeIcon onClick={handleGoToHome}> <StyledHomeIcon  title="Go to Home"/><IconLabel >HOME</IconLabel> </IconsHolderStyledHomeIcon>
          </IconsHolder>
          <IconsHolder>
            <IconsHolderSearch><Search type="text" placeholder="Search programs..." value={searchQuery} onChange={handleSearch}/></IconsHolderSearch>
          </IconsHolder>
          <IconsHolder>
            <IconsHolderUserRegiteredPrograms onClick={handleDashboard}><UserRegiteredPrograms title="Go to Dashboard"/><IconLabel >Registered Programs</IconLabel> </IconsHolderUserRegiteredPrograms>
          </IconsHolder>
          <IconsHolder>
            <IconsHolderStyledLogoutIcon onClick={handleLogout}><StyledLogoutIcon  title="Log Out"/><IconLabel >Log Out</IconLabel> </IconsHolderStyledLogoutIcon>
          </IconsHolder>
        </IconsContainer>
        {filteredPrograms.length > 0 ? (
          <TileContainer>
            {filteredPrograms.map((program) => (
              <Tile key={program._id}>
                <TileImage src={program.posterUrl} alt={program.name} />
                <TileContent>
                  <TileHeading>{program.name}</TileHeading>
                  <TileDetails>
                    <TileLabel> Conducted by:</TileLabel> <Details>{program.conductingPerson}</Details>
                  </TileDetails>
                  <TileDetails>
                    <TileLabel>Date:</TileLabel> <Details>{handleDate(program.dateTime)}</Details>
                  </TileDetails>
                  <TileDetails>
                    <TileLabel>Time:</TileLabel> <Details>{handleTime(program.dateTime)}</Details>
                  </TileDetails>
                  <TileDetails>
                    <TileLabel>Duration:</TileLabel> <Details>{program.duration}</Details>
                  </TileDetails>
                  <ButtonContainer>
                    {program.isIncluded ? (
                      <DisabledButton>Registered</DisabledButton>
                    ) : (
                      <Button onClick={() => handleIncludeToProgram(program._id)}>Include Me</Button>
                    )}
                  </ButtonContainer>
                </TileContent>
              </Tile>
            ))}
          </TileContainer>
        ) : (
          <ProgramNotFound>No Upcoming Programs as per your Search</ProgramNotFound>
        )}
      </Container>
    </BackgroundContainer>
  );
};

export default UserHomePage;
