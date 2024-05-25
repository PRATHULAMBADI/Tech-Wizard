import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { UserSignUpFormBackground,Button,Label , ButtonContainer, Container, Input, InputContainer } from './styles';

const UserSignUpForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();

  const handleSignUpButtonClick = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/user-signup', {
        name,
        mobile,
        email,
        password,
      })
      .then(result =>{
        console.log(result)
        alert('Registeration Sucessfull. Now You Can LogIn')
        navigate('/user-login')
      }) 
      .catch (err => console.log(err))
  }
  const handleLogInButtonClick = () => {
    navigate('/user-login');
  };

  return (
    <UserSignUpFormBackground>
      <Container>
        <InputContainer>
        <Label>Name:</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </InputContainer>
        <InputContainer>
        <Label>Mobile:</Label>
        <Input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </InputContainer>
        <InputContainer>
        <Label>Email:</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </InputContainer><InputContainer>
        <Label>Password:</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </InputContainer><ButtonContainer>
        <Button onClick={handleSignUpButtonClick}>Sign Up</Button>
        <Button onClick={handleLogInButtonClick}>Login</Button>
        </ButtonContainer>
      </Container>
    </UserSignUpFormBackground>
  );
};

export default UserSignUpForm;
