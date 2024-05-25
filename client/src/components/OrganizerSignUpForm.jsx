import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { OrganizerSignUpFormBackground,Button, Label, ButtonContainer, Container, Input, InputContainer } from './styles';

const OrganizerSignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/organizer-signup', {
        name,
        email,
        organization,
        phone,
        password,
      });
      console.log(response.data); // Assuming your backend sends back some data upon successful registration
      alert('Registration successful. Now you can log in.');
      navigate('/organizer-login');
    } catch (error) {
      console.error(error);
      // Handle error response from backend if needed
    }
  };

  const handleLogInButtonClick = () => {
    navigate('/organizer-login');
  };

  return (
    <OrganizerSignUpFormBackground>
      <Container>
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
        <ButtonContainer>
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Button onClick={handleLogInButtonClick}>Login</Button>
        </ButtonContainer>
      </Container>
    </OrganizerSignUpFormBackground>
  );
};

export default OrganizerSignUpForm;
