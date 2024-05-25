import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { UserLoginFormHeading,UserLoginFormBackgroundContainerImg,ForgetPassword,NavLink,UserLoginFormBackground,Label, Input, InputContainer,InputHolder, Container, Button, ButtonContainer } from './styles';


const UserLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    axios
      .post("http://localhost:3000/user-login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data.auth) {
         
          navigate('/user-home');
        } else {
          alert("Login Failed");
          navigate('/user-login');
        }
      })
      .catch((err) => {
        alert(err.response?.data.message);
  });
}
  const handleSignUpButtonClick = () => {
    navigate('/user-signup');
  };

  return (
    <UserLoginFormBackground>
      <Container className="FormContainer" onSubmit={handleSubmit}>
        <UserLoginFormBackgroundContainerImg>
        <InputHolder>
          <InputContainer>
          <UserLoginFormHeading>LOG IN</UserLoginFormHeading>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="email" className="Label">Email:</Label>
            <Input type="email" id="email" className="Input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password" className="Label">Password:</Label>
            <Input type="password" id="password" className="Input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </InputContainer>
        </InputHolder>
        <ForgetPassword><NavLink to= '/user-resetPasswordRequest' >Forget Password ?</NavLink></ForgetPassword>
        <ButtonContainer>
          <Button type="submit" className="Button">Login</Button>
          <Button type="button" className="Button" onClick={handleSignUpButtonClick}>Sign Up</Button>
        </ButtonContainer>
        </UserLoginFormBackgroundContainerImg>
      </Container>    
    </UserLoginFormBackground>
  );
};

export default UserLoginForm;