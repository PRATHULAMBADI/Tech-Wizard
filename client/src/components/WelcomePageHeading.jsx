import React from "react";
import icon from "../images/1.png";
import {
  WelcomePageMainHeadingIcon,
  BackgroundContainer,
  WelcomePageMainHeading,
} from "./WelcomePageHeadingStyles";

const WelcomePageHeading = () => {
  return (
    <BackgroundContainer>
      <WelcomePageMainHeading>
        Tech
        <WelcomePageMainHeadingIcon
          src={icon}
          alt="WelcomePageMainHeadingIcon"
        />
        Wizard
      </WelcomePageMainHeading>
    </BackgroundContainer>
  );
};

export default WelcomePageHeading;
