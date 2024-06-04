import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { 
  ContainerHeading,
  BackgroundContainer,
  Button,
  Label,
  ButtonContainer,
  Container,
  Input,
  InputContainer
 } from './styles';

const OrganizerSignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (name.trim() === '') {
      setErrorMessage('Please enter your name.');
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      isValid = false;
    } else if (isNaN(mobile) || mobile.toString().length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      isValid = false;
    }

    if (!isValid) {
      return; // Prevent sending invalid data if validation fails
    }
    try {
      const response = await axios.post('http://localhost:3000/organizer-signup', {
        name,
        email,
        organization,
        phone,
        password,
      });
      console.log(response.data);
      alert('Registration successful. Now you can log in.');
      navigate('/organizer-login');
    } catch (error) {
      console.error(error);
      setErrorMessage(err.response?.data.message || "An error occurred during signup.");
    }
  };

  const handleLogInButtonClick = () => {
    navigate('/organizer-login');
  };

  return (
    <BackgroundContainer>
      <Container>
        <ContainerHeading>Organizer Sign Up</ContainerHeading>
        <InputContainer>
          <Label>Name:</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Email:</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Organization:</Label>
          <Input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Phone:</Label>
          <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Password:</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </InputContainer>
        {errorMessage && (
          <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
        )}
        <ButtonContainer>
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Button onClick={handleLogInButtonClick}>Login</Button>
        </ButtonContainer>
      </Container>
    </BackgroundContainer>
  );
};

export default OrganizerSignUpForm;
