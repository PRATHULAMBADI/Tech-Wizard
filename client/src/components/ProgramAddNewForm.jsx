import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  UserSignUpFormBackground,
  Button,
  Label,
  ButtonContainer,
  Container,
  Input,
  InputContainer,
} from './styles';

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

const ProgramAddNewForm = () => {
  const [name, setName] = useState('');
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

  const handleCreateNewProgram = async (e) => {
    e.preventDefault();
    const formData = new FormData();
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
      const response = await axios.post('http://localhost:3000/program-addNew', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Program added successfully');
      navigate('/organizer-home');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'An error occurred while adding the program');
    }
  };

  const handleNotNow = () => {
    navigate('/organizer-home');
  };

  return (
    <UserSignUpFormBackground>
      <Container onSubmit={handleCreateNewProgram} method="POST" encType="multipart/form-data">
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <InputContainer>
          <Label>Name:</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Poster:</Label>
          <Input type="file" onChange={(e) => setPoster(e.target.files[0])} required />
        </InputContainer>
        <InputContainer>
          <Label>Conducting Person:</Label>
          <Input type="text" value={conductingPerson} onChange={(e) => setConductingPerson(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Venue:</Label>
          <Input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Date:</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Time:</Label>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Duration:</Label>
          <Input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Registration Link:</Label>
          <Input type="url" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Website:</Label>
          <Input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <Label>Facebook:</Label>
          <Input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <Label>Instagram:</Label>
          <Input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">Add Program</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button type="button" onClick={handleNotNow}>Not Now</Button>
        </ButtonContainer>
      </Container>
    </UserSignUpFormBackground>
  );
};

export default ProgramAddNewForm;
