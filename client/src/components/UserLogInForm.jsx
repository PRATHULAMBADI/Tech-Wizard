import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { 
  BackgroundContainer,
  ContainerHeading, 
  ForgetPassword, 
  NavLink, 
  Label, 
  Input, 
  InputContainer, 
  Container, 
  Button, 
  ButtonContainer,
  ErrorMessageContainer
} from './styles';

const UserLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user-login",{
        email,
        password
      },{
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      localStorage.setItem('authToken', response.data.token);
      
      if (response?.data.auth) {
        navigate('/user-home');
      } else {
        alert("Login Failed");
        navigate('/user-login');
      }
    } catch (err) {
      setErrorMessage(err.response?.data.message || "An error occurred during login.");
    }
  };

  const handleSignUp = () => {
    navigate('/user-signup');
  };

  return (
    <BackgroundContainer>
      <Container>
        <ContainerHeading>Log In</ContainerHeading>
        <InputContainer>
          <Label htmlFor="email" className="Label">Email:</Label>
          <Input type="email" id="email" className="Input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password" className="Label">Password:</Label>
          <Input type="password" id="password" className="Input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </InputContainer>
        <ForgetPassword><NavLink to='/user-resetPasswordRequest'>Forget Password?</NavLink></ForgetPassword>
        <ErrorMessageContainer>
          {errorMessage && <span>{errorMessage}</span>}
        </ErrorMessageContainer>
        <ButtonContainer>
          <Button type="submit" className="Button" onClick={handleSubmit}>Login</Button>
          <Button type="button" className="Button" onClick={handleSignUp}>Sign Up</Button>
        </ButtonContainer>
      </Container>
    </BackgroundContainer>
  );
};

export default UserLoginForm;
