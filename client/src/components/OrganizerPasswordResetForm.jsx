import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';

import { 
    BackgroundContainer,
    ContainerHeading,
    Container,
    ButtonContainer,
    Button,
    Label,
    InputContainer,
    Input,

 } from './styles';

const OrganizerPasswordResetForm = () => {
    const [newPassword, setNewPassword] = useState('');    
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { resetToken, email: encodedEmail } = useParams();

    console.log(resetToken, encodedEmail);

    useEffect(() => {
        if (encodedEmail) {
            const decodedEmail = decodeURIComponent(encodedEmail);
            setEmail(decodedEmail);
        }
    }, [encodedEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('hi')
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
                <ButtonContainer>
                    <Button type="submit">Update</Button>
                </ButtonContainer>
            </Container>
        </BackgroundContainer>
    );
};

export default OrganizerPasswordResetForm;
