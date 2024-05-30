import { useState } from 'react';
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
  ErrorMessageContainer
} from './styles';

const UserSignUpForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [password, setPassword] = useState('');  

  const navigate = useNavigate();

  const handleSignUpButtonClick = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:3000/user-signup', {
          name,
          mobile,
          email,
          password,
    },{
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
    }
  };
  const handleLogInButtonClick = () => {
    navigate('/user-login');
  };

  return (
    <BackgroundContainer>
      <Container>
        <ContainerHeading>Sign Up</ContainerHeading>
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
        </InputContainer>
        <ErrorMessageContainer>
          {errorMessage && {error}}
       </ErrorMessageContainer>
        <ButtonContainer>
        <Button onClick={handleSignUpButtonClick}>Sign Up</Button>
        <Button onClick={handleLogInButtonClick}>Login</Button>
        </ButtonContainer>
      </Container>
    </BackgroundContainer>
  );
};

export default UserSignUpForm;
