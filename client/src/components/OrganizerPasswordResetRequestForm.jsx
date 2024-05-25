import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label , Input , InputContainer ,Container, Button } from './styles';

const OrganizerPasswordResetRequestForm = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [waiting, setWaiting] =useState('');

    //const navigate = useNavigate();
    //console.log('Error:',{error},'Message:',{message},'Email:',{email},'Waiting:',{waiting})
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError(''); 
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
          setError(error.response.data.error || ' Enter a valid Email ');
          alert(response.data.status);
        }
        console.log('Email:',{email})
    };

    return (
        <div>
            <h4>Forgot Password</h4>
            <Container>
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
                <Button type="submit"  onClick={handleSubmit}>Send</Button>
            </Container>
            {waiting && <div>Processing request...</div>}
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default OrganizerPasswordResetRequestForm;
