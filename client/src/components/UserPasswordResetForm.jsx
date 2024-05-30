import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';


import {ContainerHeading, BackgroundContainer } from './styles';

const UserPasswordResetForm = () => {
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
        try {
            const response = await axios.post(
                `http://localhost:3000/user-resetPassword/${resetToken}/${encodeURIComponent(encodedEmail)}`,
                {
                    newPassword,
                    confirmPassword
                }
            );
            if (response.status === 200 && response.data) {
                navigate('/user-login');
            } else {
                console.error('API call failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <BackgroundContainer>
            <ContainerHeading>Reset Password</ContainerHeading>
            <form onSubmit={handleSubmit}>
                <div>              
                  <label>Email:</label>
                  <input type="email" value={email} disabled />
                  <label>New Password:</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  <label>Confirm Password:</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Update</button>
            </form>
        </BackgroundContainer>
    );
};

export default UserPasswordResetForm;
