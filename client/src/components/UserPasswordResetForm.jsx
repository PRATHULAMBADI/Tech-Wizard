import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';

import {
    ContainerHeading,
    BackgroundContainer,
    Container,
    InputContainer,
    Label,
    Input,
    ButtonContainer,
    Button,
    MessageContainer,
    ErrorMessageContainer,
    IconsContainer,
    IconsHolder,
    IconsHolderStyledHomeIcon,
    StyledHomeIcon,
    IconLabel
} from './styles';

const UserPasswordResetForm = () => {
    const [newPassword, setNewPassword] = useState('');    
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { resetToken, email: encodedEmail } = useParams();

    useEffect(() => {
        if (encodedEmail) {
            const decodedEmail = decodeURIComponent(encodedEmail);
            setEmail(decodedEmail);
        }
    }, [encodedEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrorMessage(''); 
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
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
        
        setIsLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:3000/user-resetPassword/${resetToken}/${encodeURIComponent(email)}`,
                {
                    newPassword,
                    confirmPassword
                }
            );
            if (response.status === 200 && response.data) {
                navigate('/user-login');
            } else {
                setErrorMessage('API call failed: ' + response.statusText);
            }
        } catch (error) {
            setErrorMessage(error.response?.data.message || "An error occurred during resetting password.");
        }finally {
           setIsLoading(false); 
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
                {message && (
                    <MessageContainer>{message}</MessageContainer>
                )}
                {errorMessage && (
                    <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
                )}
                <ButtonContainer>
                   <Button type="submit">Update</Button>
                </ButtonContainer>
            </Container>
        </BackgroundContainer>
    );
};

export default UserPasswordResetForm;
