import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomePageHeading from "../components/WelcomePageHeading";
import Dashboard from "../components/Dashboard";

import {
  ButtonContainerHeading,
  WelcomePageContentHeading,
  WelcomePageDetails,
  BackgroundContainer,
  ButtonContainer,
  StyledArrowCircleRightOutlinedIcon,
  StyledArrowCircleLeftOutlinedIcon,
  WelcomePageButton,
} from "./WelcomePageStyle";


const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogInAsUser = () => {
    navigate("/user-login");
  };
  const handleLogInAsOrganizer = () => {
    navigate("/organizer-login");
  };
  return (
    <BackgroundContainer>
      <WelcomePageHeading />
      {/* <WelcomePageImageContainer>
        <WelcomePageImage src={ImageURL} />
      </WelcomePageImageContainer> */}
      <Dashboard />

      <WelcomePageContentHeading>
        "Discover Your Future: Explore, Learn, Grow"
      </WelcomePageContentHeading>
      <WelcomePageDetails>
        Welcome to " Tech Wizard: Accelerate Your Skills ", where opportunities
        meet ambition. Dive into a world of knowledge, innovation, and
        collaboration. Join us on a journey of learning, networking, and
        personal growth. Whether you're a tech enthusiast, an aspiring
        entrepreneur, or a lifelong learner, our platform is your gateway to
        success. Explore upcoming bootcamps, workshops, and events, connect with
        industry experts, and unleash your potential. Your future starts here!
      </WelcomePageDetails>
      <ButtonContainer>
        <WelcomePageButton
          type="submit"
          title="Login as User"
          onClick={handleLogInAsUser}
        >
          User
        </WelcomePageButton>
        <StyledArrowCircleLeftOutlinedIcon tilte="hai" />
        <ButtonContainerHeading> Discover it as a </ButtonContainerHeading>
        <StyledArrowCircleRightOutlinedIcon title="hello" />
        <WelcomePageButton
          type="submit"
          title="Login as Organizer"
          onClick={handleLogInAsOrganizer}
        >
          Organizer
        </WelcomePageButton>
      </ButtonContainer>
    </BackgroundContainer>
  );
};

export default WelcomePage;
