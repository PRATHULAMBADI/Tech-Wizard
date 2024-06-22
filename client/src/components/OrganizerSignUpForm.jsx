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
  InputContainer,
  ErrorMessageContainer ,
  MessageContainer, 
  IconsContainer,
  IconsHolder,
  IconsHolderStyledHomeIcon,
  StyledHomeIcon,
  IconLabel
 } from './OrganizerSignUpFormstyles';

 const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OrganizerSignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading]= useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('')
    let isValid = true;
    if (name.trim() === '') {
      setErrorMessage('Please enter your name.');
      isValid = false;
    } else if (email === '') {
      setErrorMessage('Enter an E-mail');
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
        setErrorMessage('Invalid E-mail format.');
        isValid = false;
    } else if (organization === '') {
      setErrorMessage('Organization is required.');
      isValid = false;
    } else if (phone === '') {
      setErrorMessage('Enter a Mobile Number');
      isValid = false;
    } else if (phone.toString().length !== 10) {
      setErrorMessage('10 digit Mobile Number Needed');
      isValid = false;
    }else if (password === '') {
      setErrorMessage('Enter a Password');
      isValid = false;
    }else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    
    setIsLoading(true); 

    try {
      const response = await axios.post('http://localhost:3000/organizer-signup', {
        name,
        email,
        organization,
        phone,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      alert('Registration successful. Now you can log in.');
      navigate('/organizer-login');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data.message || "An error occurred during signup.");
    } finally {
      setIsLoading(false); 
    }
  };

  const handleLogInButtonClick = () => {
    navigate('/organizer-login');
  };
  const handleGoToHome = () =>{
    navigate('/');
  }

  return (
    <BackgroundContainer>
      <IconsContainer>            
          <IconsHolder>
            <IconsHolderStyledHomeIcon onClick={handleGoToHome}> <StyledHomeIcon  title="Go to Home"/><IconLabel >HOME</IconLabel> </IconsHolderStyledHomeIcon>
          </IconsHolder>
        </IconsContainer>
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
          {isLoading && <  MessageContainer />} 
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Button onClick={handleLogInButtonClick}>Login</Button>
        </ButtonContainer>
      </Container>
    </BackgroundContainer>
  );
};

export default OrganizerSignUpForm;
