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
    ErrorMessageContainer
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
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

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
        }
    };

    return (
        <BackgroundContainer>
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
