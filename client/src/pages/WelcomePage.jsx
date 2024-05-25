import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageURL from '../images/m.png';
import { ButtonContainerHeading,WelcomePageHeading,WelcomePageImageContainer,WelcomePageImage,WelcomePageDetails,WelcomePageBackgroundContainer,ButtonContainer,Button } from './styles';
import axios from 'axios'; 



const WelcomePage = () => {

  const navigate = useNavigate();

    const handleLogInAsUser = () => {
        navigate('/user-login');
      };
    const handleLogInAsOrganizer = () => {
        navigate('/organizer-login');
      };
  return (
    <WelcomePageBackgroundContainer>
        <WelcomePageImageContainer><WelcomePageImage src={ImageURL}/></WelcomePageImageContainer>
        <WelcomePageHeading>"Discover Your Future: Explore, Learn, Grow"</WelcomePageHeading>
        <WelcomePageDetails>Welcome to " Tech Wizard: Accelerate Your Skills ", where opportunities meet ambition. Dive into a world of knowledge, innovation, and collaboration. Join us on a journey of learning, networking, and personal growth. Whether you're a tech enthusiast, an aspiring entrepreneur, or a lifelong learner, our platform is your gateway to success. Explore upcoming bootcamps, workshops, and events, connect with industry experts, and unleash your potential. Your future starts here!</WelcomePageDetails>
        <ButtonContainer>
          <ButtonContainerHeading>Log In as a</ButtonContainerHeading>
          <Button type="submit"  onClick={handleLogInAsUser}>User</Button>
          <Button type="submit"  onClick={handleLogInAsOrganizer}>Organizer</Button>
        </ButtonContainer>
      </WelcomePageBackgroundContainer>
  );
};

export default WelcomePage;