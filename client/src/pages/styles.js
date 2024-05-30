import styled,{ css } from 'styled-components';
// import { Link } from 'react-router-dom';

// icons from Material-UI

import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

// Base styles
const baseButtonStyles = css`
  padding: 10px 20px;
  background-color: darkgoldenrod;
  color: whitesmoke;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: transparent;
    color:black;
  }
`;

const tileStyles = css`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 18%;
  text-align: center;
  transition: transform 0.2s;
  
  &:hover{
    transform: translateY(-5px); 
  }
`

// Button component
export const Button = styled.button`
  ${baseButtonStyles}
`;


export  const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  opacity:1;
  padding: 0 5% 5% 5%;
`;

export const ButtonContainerHeading = styled.div`
  font-weight: bold;
  font-size: 20px;  
`
export const Container = styled.div`
  
`
export const ContainerHeading = styled.div`
  align-content: center;
  background-color: transparent;
  text-align:center;
  padding:3% 0 0 0;
  font-weight:bold;
  font-size:80px;

`;
export const StyledArrowCircleLeftOutlinedIcon = styled(ArrowCircleLeftOutlinedIcon)`
  color: cadetblue;
  font-size: 2rem;
  &:hover {
    color: powderblue;
  }
`;

export const StyledArrowCircleRightOutlinedIcon = styled(ArrowCircleRightOutlinedIcon)`
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
  }
`;

export const StyledLogoutIcon = styled(LogoutIcon)`
  color: black;
  font-size: 20px;
  &:hover {
    color: powderblue;
  }
`;

//================================ WelcomePage ===============================//


export const WelcomePageImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WelcomePageImage = styled.img`
  border:none;
  border-radius:15%;
  width:400px;
  height:350px;
  padding : 2%;
`

export const WelcomePageContentHeading = styled.div`
  font-size:100px;
  text-align: center;
  color: cadetblue;
  font-weight: bold;
  text-stroke: 2px white;
  -webkit-text-stroke: 1.4px whitesmoke;
`
export const WelcomePageDetails = styled.div`
  font-size: 30px;
  padding: 0 12% 5%;
  text-align: justify;
`
export const BackgroundContainer = styled.div`
  // width: 100vw;
  // height: fit-content;
  // align-content: center;  

  font-size: 134px;
  font-weight: bold;
  color: cadetblue;
  position absolute;
  
`


//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

export const UserSignUpFormBackground =styled.div`
    width:100vw;
`

//-----------------------------------------UserHomePageContainer/OrganizerHomePageContainer---------------------------------------------------//


export const TileContent =styled.p`
  font-size: 1rem;
  color: #666;
`;

export const TileHeading =styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const TileContainer =styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`
export const Tile =styled.li`
  ${ tileStyles }
`
export const TileImage =styled.img`
  width: 100%;  
`;

export const ExtentedButtonContainer = styled(ButtonContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
`;

export const ExtentedButton = styled(Button)`
  background-color:transparent;
  font-size:24px;
`;


//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------////-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
