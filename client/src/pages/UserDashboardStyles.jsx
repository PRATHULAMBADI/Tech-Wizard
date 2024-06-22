import styled, { css } from "styled-components";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ContactPageIcon from "@mui/icons-material/ContactPage";

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

export const Button = styled.button`
  ${baseButtonStyles}
`;

export const IconsHolder = styled.div`
  width: 25%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  opacity: 1;
  padding: 3%;
`;

export const BackgroundContainer = styled.div`
  font-size: 134px;
  font-weight: bold;
  color: cadetblue;
  position absolute;  
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

export const Label = styled.label``;

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

export const IconsHolderBackToUserHome = styled.div`
  ${IconsHolderStyle}
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

export const IconLabel = styled.label`
  color:black;
  background-color:transparent;
  font-size:10%;s
  font-weight:normal;
  &:hover {
    color: powderblue;
  }
`;

export const IconsContainer = styled.div`
  color: white;
  // background-color:cyan;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2% 0;
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

export const Details = styled.div`
  text-transform: uppercase;
  color: darksalmon;
`;
    
export const BackToUserHome = styled(ContactPageIcon)`
  color: black;
  font-size: 20px;
  &:hover {
    color: powderblue;
  }
`;

export const Tile = styled.li`
${tileStyles}
`;

export const TileImage = styled.img`
width: 100%;
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

export const TileLabel = styled(Label)`
font-weight: normal;
color: lightseagreen;
`;