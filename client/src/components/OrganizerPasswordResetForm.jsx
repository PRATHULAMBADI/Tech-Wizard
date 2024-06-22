import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';

import { 
    ContainerHeading,
    BackgroundContainer,    
    Container,
    InputContainer,
    Button,
    Label,
    Input,
    ButtonContainer,
    MessageContainer,
    ErrorMessageContainer,
    IconsContainer,
    IconsHolder,
    IconsHolderStyledHomeIcon,
    StyledHomeIcon,
    IconLabel

 } from './styles';

const OrganizerPasswordResetForm = () => {
    const [newPassword, setNewPassword] = useState('');    
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [email, setEmail] = useState('');
    const { resetToken, email: encodedEmail } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const {waiting,SetWaiting} =useState('');

    const navigate = useNavigate();

    console.log(resetToken, encodedEmail);

    useEffect(() => {
        if (encodedEmail) {
            const decodedEmail = decodeURIComponent(encodedEmail);
            setEmail(decodedEmail);
        }
    }, [encodedEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        let isValid = true;
         if (newPassword.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            isValid = false;
        }
    
        if (!isValid) {
          return;
        }
        
        SetWaiting(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/organizer-resetPassword/${resetToken}/${encodeURIComponent(encodedEmail)}`,
                {
                    newPassword,
                    confirmPassword
                }
            );
            if (response.status === 200 && response.data) {
                navigate('/organizer-login');
            } else {
                console.error('API call failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
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
            <Container onSubmit={handleSubmit}>
            <ContainerHeading>Reset Password</ContainerHeading>
                <InputContainer>              
                  <Label>Email:</Label>
                  <Input type="email" value={email} disabled />
                </InputContainer>
                <InputContainer>
                  <Label>New Password:</Label>
                  <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </InputContainer>
                <InputContainer>
                  <Label>Confirm Password:</Label>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </InputContainer>
                {errorMessage && (
                 <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
                  )}
                <ButtonContainer>
                    {waiting && <  MessageContainer />} 
                    <Button type="submit">Update</Button>
                </ButtonContainer>
            </Container>
        </BackgroundContainer>
    );
};

export default OrganizerPasswordResetForm;
