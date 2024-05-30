import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { ContainerHeading, BackgroundContainer, ForgetPassword, NavLink, Label, Input, InputContainer, Container, Button, ButtonContainer } from './styles';

const OrganizerLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/organizer-login", {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem('authToken', response.data.token);
      
      if (response?.data.auth) {
        navigate('/organizer-home');
      } else {
        alert("Login Failed");
        navigate('/organizer-login');
      }
    } catch (err) {
      setErrorMessage(err.response?.data.message || "An error occurred during login.");
    }
  };

  const handleSignUp = () => {
    navigate('/organizer-signup');
  };

  return (
   <BackgroundContainer>
    <Container>
      <ContainerHeading>Organizer Log In</ContainerHeading>
      <InputContainer>
        <Label htmlFor="email" className="Label">Email:</Label>
        <Input type="email" id="email" className="Input" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="password" className="Label">Password:</Label>
        <Input type="password" id="password" className="Input" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </InputContainer>
      <ForgetPassword><NavLink to='/organizer-resetPasswordRequest'>Forget Password?</NavLink></ForgetPassword>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ButtonContainer>
        <Button type="submit" className="Button" onClick={handleSubmit}>Login</Button>
        <Button type="button" className="Button" onClick={handleSignUp}>Sign Up</Button>
      </ButtonContainer>
    </Container>
    </BackgroundContainer>
  );
};

export default OrganizerLoginForm;
