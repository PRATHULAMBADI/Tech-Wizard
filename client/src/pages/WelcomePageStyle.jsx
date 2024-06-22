import styled, { css } from "styled-components";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const IconsHolderStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  &:hover {
    color: powderblue;
  }
`;

const baseButtonStyles = css`
  padding: 10px;
  background-color: transparent;
  color: gray;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease-in-out;
  border-color: lightseagreen;
  border-style: outset;
  width: 45%;

  &:hover {
    background-color: transparent;
    color: cadetblue;
    border: none;
  }
`;

export const IconsHolderStyledHomeIcon = styled.div`
${IconsHolderStyle}
`;

export const IconsHolderUserRegiteredPrograms = styled.div`
${IconsHolderStyle}
`;

export const IconsHolderStyledLogoutIcon = styled.div`
${IconsHolderStyle}
`;

export const IconsHolderSearch = styled.div`
${IconsHolderStyle}
`;

export const IconsHolderBackToUserHome = styled.div`
${IconsHolderStyle}
`;


export const StyledArrowCircleLeftOutlinedIcon = styled(
ArrowCircleLeftOutlinedIcon
)`
  color: cadetblue;
  font-size: 2rem;
  &:hover {
      color: powderblue;
  }
`;

export const StyledArrowCircleRightOutlinedIcon = styled(
ArrowCircleRightOutlinedIcon
)`
  color: cadetblue;
  font-size: 2rem;
  &:hover {
      color: powderblue;
  }
`;

export const BackgroundContainer = styled.div`
  font-size: 134px;
  font-weight: bold;
  color: cadetblue;
  position absolute;
`;

export const ButtonContainerHeading = styled.div`
  font-weight: bold;
  font-size: 10%;
`;

export const ButtonContainer = styled.div`
  width: 100vw; 
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  opacity: 1;
  padding: 3% 0;
`;

export const WelcomePageButton = styled.button`
${baseButtonStyles}
  width:10% 
`;

export const WelcomePageImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WelcomePageImage = styled.img`
  border: none;
  border-radius: 15%;
  width: 10%;
  height: 10%;
  padding: 1%;
`;

export const WelcomePageContentHeading = styled.div`
  font-size: 20%;
  text-align: center;
  color: darkgoldenrod;
  font-weight: bold;
  text-stroke: 2px white;
  -webkit-text-stroke: 1.4px whitesmoke;
`;
export const WelcomePageDetails = styled.div`
  font-size: 12%;
  padding: 0 14%;
  text-align: justify;
  font-weight: normal;
`;