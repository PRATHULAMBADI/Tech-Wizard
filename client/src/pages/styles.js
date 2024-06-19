import styled, { css } from "styled-components";
// import { Link } from 'react-router-dom';

// icons from Material-UI

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ContactPageIcon from "@mui/icons-material/ContactPage";

// Base styles
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

const tileStyles = css`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1%;
  width: 14%;
  text-align: center;
  transition: transform 0.2s;
  height: fit-content;

  &:hover {
    transform: translateY(-5px);
  }
`;

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

export const Label = styled.label``;

export const Search = styled.input`
  padding: 1%;
  border-radius: 5px;
  font-size: 12%;
  color: seagreen;
  width: 100%;
  border: 1px solid lightseagreen;
  &:hover {
    border: 2px solid lightseagreen;
  }
`;

export const SearchBarHolder = styled.div`
  padding: 1%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Button component
export const Button = styled.button`
  ${baseButtonStyles}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  opacity: 1;
  padding: 3%;
`;

export const ButtonContainerHeading = styled.div`
  font-weight: bold;
  font-size: 10%;
`;
export const Container = styled.div`
  width: 100%;
`;
export const ContainerHeading = styled.div`
  margin: 0;
  align-content: center;
  background-color: transparent;
  text-align: center;
  padding: 3% 0 0 0;
  font-weight: bold;
  font-size: 30%;
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

export const StyledHomeIcon = styled(HomeIcon)`
  color: black;
  font-size: 40px;
  &:hover {
    color: powderblue;
    title: "home";
  }
`;

export const StyledLogoutIcon = styled(LogoutIcon)`
  color: black;
  font-size: 20px;
  &:hover {
    color: powderblue;
  }
`;

export const UserRegiteredPrograms = styled(ManageAccountsIcon)`
  color: black;
  font-size: 20px;
  &:hover {
    color: powderblue;
  }
`;

export const AddNewPrograms = styled(ManageAccountsIcon)`
  color: black;
  font-size: 20px;
  &:hover {
    color: powderblue;
  }
`;

export const AddIcon = styled(NoteAddIcon)`
  color: black;
  font-size: 20px;
  &:hover {
    color: powderblue;
  }
`;
export const BackToUserHome = styled(ContactPageIcon)`
  color: black;
  font-size: 20px;
  &:hover {
    color: powderblue;
  }
`;

export const ProgramNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98vw;
  height: calc(100vh - 215px);
  font-size: 24px;
  color: #fff;
  text-align: center;
  color: powderblue;
`;

export const DisabledButton = styled.button`
  ${baseButtonStyles}
  opacity: 0.6;
  cursor: not-allowed;
`;

//================================ WelcomePage ===============================//

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
export const BackgroundContainer = styled.div`
  // width: 100vw;
  // height: fit-content;
  // align-content: center;  

  font-size: 134px;
  font-weight: bold;
  color: cadetblue;
  position absolute;
  
`;
export const WelcomePageButton = styled.button`
  ${baseButtonStyles}
  width:10%
`;

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

export const UserSignUpFormBackground = styled.div`
  width: 100vw;
`;

//-----------------------------------------UserHomePageContainer/OrganizerHomePageContainer---------------------------------------------------//

export const IconsContainer = styled.div`
  color: white;
  // background-color:cyan;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2% 0;
`;

export const IconsHolder = styled.div`
  width: 25%;
  //  background-color:red;
`;

export const IconLabel = styled.label`
  color:black;
  background-color:transparent;
  font-size:10%;s
  font-weight:normal;
  &:hover {
    color: powderblue;
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

export const TileContent = styled.div``;

export const TileDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: powderblue;
  width: 80%;
  font-size: 8%;
  padding: 0 10%;
`;

export const TileHeading = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 10%;
  margin-bottom: 0.5rem;
  color: gray;
`;

export const TileContainer = styled.ul`
  margin: 0;
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const Tile = styled.li`
  ${tileStyles}
`;
export const TileImage = styled.img`
  width: 100%;
`;

export const ExtentedButtonContainer = styled(ButtonContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  margin: 2%;
`;

export const ExtentedButton = styled(Button)`
  background-color: transparent;
  font-size: 24px;
  margin-top: 2%;
  color: gray;
`;

export const TileLabel = styled(Label)`
  font-weight: normal;
  color: lightseagreen;
`;

export const Details = styled.div`
  text-transform: uppercase;
  color: darksalmon;
`;

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------////-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
