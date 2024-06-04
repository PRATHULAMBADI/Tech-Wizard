import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageURL from '../images/m.png';
import WelcomePageHeading from '../components/WelcomePageHeading'


import {   
  ButtonContainerHeading,
  WelcomePageContentHeading,
  WelcomePageImageContainer,
  WelcomePageImage,
  WelcomePageDetails,
  BackgroundContainer,
  ButtonContainer,
  StyledArrowCircleRightOutlinedIcon,
  StyledArrowCircleLeftOutlinedIcon,
  Button 
} from './styles';
// import axios from 'axios'; 



const WelcomePage = () => {

  const navigate = useNavigate();

    const handleLogInAsUser = () => {
        navigate('/user-login');
      };
    const handleLogInAsOrganizer = () => {
        navigate('/organizer-login');
      };
  return (
    <BackgroundContainer>
      <WelcomePageHeading/>
        <WelcomePageImageContainer><WelcomePageImage src={ImageURL}/></WelcomePageImageContainer>
        <WelcomePageContentHeading>"Discover Your Future: Explore, Learn, Grow"</WelcomePageContentHeading>
        <WelcomePageDetails>Welcome to " Tech Wizard: Accelerate Your Skills ", where opportunities meet ambition. Dive into a world of knowledge, innovation, and collaboration. Join us on a journey of learning, networking, and personal growth. Whether you're a tech enthusiast, an aspiring entrepreneur, or a lifelong learner, our platform is your gateway to success. Explore upcoming bootcamps, workshops, and events, connect with industry experts, and unleash your potential. Your future starts here!</WelcomePageDetails>
        <ButtonContainer>
          <Button type="submit" title="Login as User" onClick={handleLogInAsUser}>User</Button>
          <StyledArrowCircleLeftOutlinedIcon tilte='hai'/>
          <ButtonContainerHeading> Discover it as a </ButtonContainerHeading>
          <StyledArrowCircleRightOutlinedIcon title='hello'/>
          <Button type="submit" title="Login as Organizer" onClick={handleLogInAsOrganizer}>Organizer</Button>
        </ButtonContainer>
      </BackgroundContainer>
  );
};

export default WelcomePage;

