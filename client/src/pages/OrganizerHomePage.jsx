import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ButtonContainer,
  BackgroundContainer,
  Container,
  ContainerHeading,
  Tile,
  TileContainer,
  TileImage,
  TileHeading,
  TileContent,
  IconsHolder,
  StyledHomeIcon,
  StyledLogoutIcon,
  AddIcon,
  TileDetails,
  TileLabel,
  Details,
  Search,
  ProgramNotFound
} from './styles';

const OrganizerHomePage = () => {
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
  const handleGoToHome = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
  const handleDate = (dateTime) => {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleDateString();
  }
  
  const handleTime = (dateTime) => {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleTimeString();
  }

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
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
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
        <ContainerHeading>Welcome to Organizer!</ContainerHeading>
          <IconsHolder>
            <StyledHomeIcon title="Go to Home" onClick={handleGoToHome}/>
            <Search type="text" placeholder="Search programs..." value={searchQuery} onChange={handleSearch}/>
            <AddIcon onClick={handleAddNewProgramClick} title='Add New Program'/>
            <StyledLogoutIcon onClick={handleLogout} title='Log Out'/>
          </IconsHolder>
        <div>
          {filteredPrograms.length > 0 ? (
            <TileContainer>
              {filteredPrograms.map((program) => (
                <Tile key={program._id}>
                   <TileImage src={program.posterUrl} alt={program.name} />
                  <TileContent>
                  <TileHeading>
                    {program.name}
                  </TileHeading>
                  <TileDetails>
                   <TileLabel> Conducted by:</TileLabel> <Details>{program.conductingPerson}</Details>
                  </TileDetails>
                  <TileDetails>
                   <TileLabel>Date:</TileLabel> <Details> {handleDate(program.dateTime)}</Details>
                  </TileDetails>
                  <TileDetails>
                   <TileLabel>Time:</TileLabel> <Details> {handleTime(program.dateTime)} </Details> 
                  </TileDetails>
                  <TileDetails>
                   <TileLabel>Duration:</TileLabel> <Details>   {program.duration} </Details> 
                    {/* <a href={program.registrationLink}>Register Here</a><br />
                    {program.otherLinks?.website && <a href={program.otherLinks.website}>Website</a>}<br />
                    {/* {program.otherLinks?.facebook && <a href={program.otherLinks.facebook}>Facebook</a>}<br />
                    {program.otherLinks?.instagram && <a href={program.otherLinks.instagram}>Instagram</a>}<br /> */} 
                  </TileDetails>
                  <ButtonContainer>
                    <Button onClick={() => handleEditProgramClick(program._id)}>Edit Details</Button>
                    <Button onClick={() => handleDeleteProgram(program._id)}>Delete</Button>
                  </ButtonContainer>
                  </TileContent>
                </Tile>
              ))}
            </TileContainer>
          ) : (
            <ProgramNotFound>No Upcoming Programs</ProgramNotFound>
        )}
        </div>
      </Container>
    </BackgroundContainer>
  );
};

export default OrganizerHomePage;
