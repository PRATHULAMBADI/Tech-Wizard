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
    BackToUserHome,
    Details,
    Search,
    ProgramNotFound,
    IconsContainer ,    
    IconLabel,
    IconsHolderStyledHomeIcon,
    IconsHolderStyledLogoutIcon,
    IconsHolderBackToUserHome,
    IconsHolderSearch
  } from './UserDashboardStyles';

const UserDashboard = () => {
  const [registeredPrograms, setRegisteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchRegisteredPrograms();
  }, []);

  const fetchRegisteredPrograms = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3000/user-dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setRegisteredPrograms(response.data.registeredPrograms);
        setLoading(false);
      } else {
        setError('Failed to fetch registered programs');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching registered programs:', error);
      setError('Error fetching registered programs. Please try again later.');
      setLoading(false);
    }
  };
  
  const handleExcludeFromProgram = async (programId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:3000/user-unregister', { programId }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Update state or perform any necessary actions after excluding the program
        const updatedPrograms = registeredPrograms.filter(program => program._id !== programId);
        setRegisteredPrograms(updatedPrograms);
        console.log('Program excluded successfully');
      } else {
        setError('Failed to exclude program');
      }
    } catch (error) {
      console.error('Error excluding program:', error);
      setError('Error excluding program. Please try again later.');
    }
  };
  
  const handleGoToHome = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/user-login');
  };

  const handleBackToUserHome = () => {
    navigate('/user-home');
  };

  const handleDate = (dateTime) => {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleDateString();
  }
  
  const handleTime = (dateTime) => {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleTimeString();
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  
  const isProgramActive = (dateTime) => {
    const now = new Date();
    const programDate = new Date(dateTime);
    return now >= programDate;
  }


  const filteredPrograms = registeredPrograms.filter(program =>
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
            <ContainerHeading>Registered Programs</ContainerHeading>
            <IconsContainer>
                <IconsHolder>
                  <IconsHolderStyledHomeIcon onClick={handleGoToHome}><StyledHomeIcon title="Go to Home"/> <IconLabel>HOME</IconLabel> </IconsHolderStyledHomeIcon>
                </IconsHolder>
                <IconsHolder>      
                 <IconsHolderSearch><Search type="text" placeholder="Search programs..." value={searchQuery} onChange={handleSearch}/></IconsHolderSearch>
                </IconsHolder>
                <IconsHolder>
                <IconsHolderBackToUserHome  onClick={handleBackToUserHome}><BackToUserHome title='Back To User Home'/><IconLabel>Back To User Home</IconLabel></IconsHolderBackToUserHome> 
                </IconsHolder>
                <IconsHolder>
                <IconsHolderStyledLogoutIcon onClick={handleLogout} ><StyledLogoutIcon  title="Log Out"/><IconLabel>Log Out</IconLabel> </IconsHolderStyledLogoutIcon>
                </IconsHolder>
              </IconsContainer>
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
                        <TileLabel>Class Link:</TileLabel> 
                        <Details>  
                         {isProgramActive(program.dateTime) ? (
                              <a href={program.registrationLink}> Class Link </a>
                            ) : (
                              <span> Not Available</span>
                            )}                       
                        </Details> 
                            {/* <a href={program.registrationLink}>Register Here</a><br />
                            {program.otherLinks?.website && <a href={program.otherLinks.website}>Website</a>}<br />
                            {/* {program.otherLinks?.facebook && <a href={program.otherLinks.facebook}>Facebook</a>}<br />
                            {program.otherLinks?.instagram && <a href={program.otherLinks.instagram}>Instagram</a>}<br /> */} 
                        </TileDetails>
                        <ButtonContainer>
                        {isProgramActive(program.dateTime) ? null : (
                          
                            <Button onClick={() => handleExcludeFromProgram(program._id)}>Exclude Me</Button>
                          
                        )}
                        </ButtonContainer>
                        </TileContent>
                        </Tile>
                    ))}
                    </TileContainer>
                ) : (                    
                    <ProgramNotFound>No program registered</ProgramNotFound>                    
                )}
            </Container>
      </BackgroundContainer>
    );
};

export default UserDashboard;
