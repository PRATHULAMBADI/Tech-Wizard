import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    BackgroundContainer,
    Label ,
    Input,
    InputContainer,
    Container,
    Button,
    ContainerHeading,
    IconsContainer,
    IconsHolder,
    IconsHolderStyledHomeIcon,
    StyledHomeIcon,
    IconLabel,
    ErrorMessageContainer,
    MessageContainer,
    ButtonContainer
 } from './styles';

const OrganizerPasswordResetRequestForm = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [waiting, setWaiting] =useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    //const navigate = useNavigate();
    //console.log('Error:',{error},'Message:',{message},'Email:',{email},'Waiting:',{waiting})
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrorMessage(''); 
        try {
          setWaiting(true);
          const response = await axios.post('http://localhost:3000/organizer-resetPasswordRequest', { email });
          const { waiting, message: successMessage } = response.data;
          setMessage(successMessage);
          setWaiting(false);
            //navigate('/login');
            
          } catch (error) {
          setWaiting(false);
          console.error('Error submitting request:', error);
          setErrorMessage(error.response.data.error || ' Enter a valid Email ');
          alert(response.data.status);
        }
        console.log('Email:',{email})
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
            <ContainerHeading>Reset Your Password</ContainerHeading>
                <InputContainer>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputContainer>
                {errorMessage && (
                 <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
                  )}
                
                    {waiting && <  MessageContainer />}
                    <ButtonContainer>
            
                <Button type="submit"  onClick={handleSubmit}>Send</Button>
                </ButtonContainer>
            </Container>
        </BackgroundContainer>
    );
};

export default OrganizerPasswordResetRequestForm;
