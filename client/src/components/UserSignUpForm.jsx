// import { useState } from 'react';
// import axios from 'axios'; 
// import { useNavigate } from 'react-router-dom';
// import { 
//   ContainerHeading,
//   BackgroundContainer,
//   Button,
//   Label,
//   ButtonContainer,
//   Container,
//   Input,
//   InputContainer,
//   ErrorMessageContainer
// } from './styles';

// const UserSignUpForm = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [errorMessage, setErrorMessage] = useState(''); 
//   const [password, setPassword] = useState('');  

//   const navigate = useNavigate();

//   const handleSignUpButtonClick = async (e) => {
//     e.preventDefault();
//     try{
//         const response = await axios.post('http://localhost:3000/user-signup', {
//           name,
//           mobile,
//           email,
//           password,
//     },{
//       headers: {
//         "Content-Type": "application/json",
//       },
//        });
//       console.log(response.data);
//       alert('Registration successful. Now you can log in.');
//       navigate('/organizer-login');
//     } catch (error) {
//       console.error(error);
//       setErrorMessage(error.response?.data.message || "An error occurred during signup.");
//     }
//   };
//   const handleLogInButtonClick = () => {
//     navigate('/user-login');
//   };

//   return (
//     <BackgroundContainer>
//       <Container>
//         <ContainerHeading>Sign Up</ContainerHeading>
//         <InputContainer>
//         <Label>Name:</Label>
//         <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </InputContainer>
//         <InputContainer>
//         <Label>Mobile:</Label>
//         <Input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
//         </InputContainer>
//         <InputContainer>
//         <Label>Email:</Label>
//         <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </InputContainer><InputContainer>
//         <Label>Password:</Label>
//         <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </InputContainer>
//         <ErrorMessageContainer>
//          { {errorMessage} && {error}}
//        </ErrorMessageContainer>
//         <ButtonContainer>
//         <Button onClick={handleSignUpButtonClick}>Sign Up</Button>
//         <Button onClick={handleLogInButtonClick}>Login</Button>
//         </ButtonContainer>
//       </Container>
//     </BackgroundContainer>
//   );
// };

// export default UserSignUpForm;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import your styling components here (replace with actual paths)
import {
  ContainerHeading,
  BackgroundContainer,
  Button,
  Label,
  ButtonContainer,
  Container,
  Input,
  InputContainer,
  ErrorMessageContainer,
  MessageContainer, // Add LoadingIndicator component for visual feedback
} from './styles';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSignUpForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate();

  const handleSignUpButtonClick = async (e) => {
    e.preventDefault();

    // Basic input validation
    let isValid = true;
    if (name.trim() === '') {
      setErrorMessage('Please enter your name.');
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      isValid = false;
    } else if (isNaN(mobile) || mobile.toString().length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      isValid = false;
    }

    if (!isValid) {
      return; // Prevent sending invalid data if validation fails
    }

    // setIsLoading(true); // Set loading indicator to true
    try {
      const response = await axios.post('http://localhost:3000/user-signup', {
        name,
        mobile,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      alert('Registration successful. Now you can log in.');
      navigate('/user-login');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data.message || "An error occurred during signup.");
    } finally {
      setIsLoading(false); // Set loading indicator to false regardless of success/error
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
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <Label>Mobile:</Label>
          <Input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Email:</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </InputContainer>
        <InputContainer>
          <Label>Password:</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </InputContainer>
        {errorMessage && (
          <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
        )}
        <ButtonContainer>
          {/* {isLoading && <  MessageContainer />}  */}
          <Button onClick={handleSignUpButtonClick}>Sign Up</Button>
          <Button onClick={handleLogInButtonClick}>Login</Button>
        </ButtonContainer>
      </Container>
    </BackgroundContainer>
  );
};

export default UserSignUpForm;
