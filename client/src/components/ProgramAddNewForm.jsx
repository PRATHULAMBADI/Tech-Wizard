import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  BackgroundContainer,
  Button,
  Label,
  ButtonContainer,
  Container,
  Input,
  ProgramInputContainer,
  ContainerHeading,
} from './styles';

const ProgramAddNewForm = () => {
  const [name, setName] = useState('');
  const [organizerId, setOrganizerID] = useState('');
  const [poster, setPoster] = useState(null);
  const [conductingPerson, setConductingPerson] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const navigate = useNavigate();
  
  const [errorMessage, setErrorMessage] = useState('');

  // const tok = localStorage.getItem('authToken');
  // const oid = JSON.parse(atob(tok.split(".")[1])).id;

  const handleCreateNewProgram = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('organizerId', organizerId);
    formData.append('name', name);
    formData.append('poster', poster);
    formData.append('conductingPerson', conductingPerson);
    formData.append('venue', venue);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('duration', duration);
    formData.append('registrationLink', registrationLink);
    formData.append('website', website);
    formData.append('facebook', facebook);
    formData.append('instagram', instagram);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:3000/program-addNew', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert('Program added successfully');
      navigate('/organizer-home');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'An error occurred while adding the program');
    }
    console.log('organizerId:',{organizerId})
  };

  const handleNotNow = () => {
    navigate('/organizer-home');
  };

  return (
    <BackgroundContainer>
      <Container onSubmit={handleCreateNewProgram} method="POST" encType="multipart/form-data">
        <ContainerHeading>ADD NEW PROGRAM</ContainerHeading>
        <ProgramInputContainer>
          <Label>Name:</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Poster:</Label>
          <Input type="file" onChange={(e) => setPoster(e.target.files[0])} required />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Conducting Person:</Label>
          <Input type="text" value={conductingPerson} onChange={(e) => setConductingPerson(e.target.value)} required />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Venue:</Label>
          <Input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Date:</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Time:</Label>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Duration:</Label>
          <Input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Registration Link:</Label>
          <Input type="url" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} required />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Website:</Label>
          <Input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Facebook:</Label>
          <Input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Instagram:</Label>
          <Input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
        </ProgramInputContainer>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <ButtonContainer>
          <Button type="submit">Add Program</Button>
          <Button type="button" onClick={handleNotNow}>Go Back</Button>
        </ButtonContainer>
      </Container>
    </BackgroundContainer>
  );
};

export default ProgramAddNewForm;
