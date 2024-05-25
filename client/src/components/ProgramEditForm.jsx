import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  UserSignUpFormBackground,
  Button,
  Label,
  ButtonContainer,
  Container,
  Input,
  InputContainer,
} from './styles';

const ProgramEditForm = () => {
  const [programData, setProgramData] = useState({});
  const [poster, setPoster] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/program-edit/${id}`);
        const program = response.data;
        setProgramData({
          name: program.name,
          conductingPerson: program.conductingPerson,
          date: program.dateTime.split('T')[0],
          time: program.dateTime.split('T')[1].slice(0, 5),
          venue: program.venue,
          duration: program.duration,
          registrationLink: program.registrationLink,
          otherLinks: {
            website: program.otherLinks?.website || '',
            facebook: program.otherLinks?.facebook || '',
            instagram: program.otherLinks?.instagram || ''
          }
        });
      } catch (error) {
        console.error('Error fetching program data:', error);
      }
    };
    fetchProgramData();
  }, [id]);

  const handleUpdateProgram = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(programData).forEach((key) => {
      if (key === 'otherLinks') {
        formData.append('website', programData.otherLinks.website);
        formData.append('facebook', programData.otherLinks.facebook);
        formData.append('instagram', programData.otherLinks.instagram);
      } else {
        formData.append(key, programData[key]);
      }
    });
    if (poster) {
      formData.append('poster', poster);
    }

    try {
      const response = await axios.post(`http://localhost:3000/program-edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Program updated successfully');
      navigate('/organizer-home');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'An error occurred while updating the program');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgramData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  return (
    <UserSignUpFormBackground>
      <Container onSubmit={handleUpdateProgram} method="POST" encType="multipart/form-data">
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <InputContainer>
          <Label>Name:</Label>
          <Input type="text" name="name" value={programData.name || ''} onChange={handleChange} required />
        </InputContainer>
        <InputContainer>
          <Label>Poster:</Label>
          <Input type="file" name="poster" onChange={handleFileChange} />
        </InputContainer>
        <InputContainer>
          <Label>Conducting Person:</Label>
          <Input type="text" name="conductingPerson" value={programData.conductingPerson || ''} onChange={handleChange} required />
        </InputContainer>
        <InputContainer>
          <Label>Venue:</Label>
          <Input type="text" name="venue" value={programData.venue || ''} onChange={handleChange} required />
        </InputContainer>
        <InputContainer>
          <Label>Date:</Label>
          <Input type="date" name="date" value={programData.date || ''} onChange={handleChange} required />
        </InputContainer>
        <InputContainer>
          <Label>Time:</Label>
          <Input type="time" name="time" value={programData.time || ''} onChange={handleChange} required />
        </InputContainer>
        <InputContainer>
          <Label>Duration:</Label>
          <Input type="text" name="duration" value={programData.duration || ''} onChange={handleChange} required />
        </InputContainer>
        <InputContainer>
          <Label>Registration Link:</Label>
          <Input type="url" name="registrationLink" value={programData.registrationLink || ''} onChange={handleChange} required />
        </InputContainer>
        <InputContainer>
          <Label>Website:</Label>
          <Input type="url" name="website" value={programData.otherLinks?.website || ''} onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <Label>Facebook:</Label>
          <Input type="url" name="facebook" value={programData.otherLinks?.facebook || ''} onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <Label>Instagram:</Label>
          <Input type="url" name="instagram" value={programData.otherLinks?.instagram || ''} onChange={handleChange} />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">Update Program</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button type="button" onClick={() => navigate('/organizer-home')}>Cancel</Button>
        </ButtonContainer>
      </Container>
    </UserSignUpFormBackground>
  );
};

export default ProgramEditForm;
