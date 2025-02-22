import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';


//==================================== General ===================================//

const baseButtonStyles = css`
  padding: 10px 20px;
  background-color: cadetblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: powderblue;
    color:cadetblue;
  }
`;

export const Button = styled.button`
  ${baseButtonStyles}
`;

export const StyledHomeIcon = styled(HomeIcon)`
  color: black;
  font-size: 40px;
  &:hover {
    color: powderblue;
    title:"home";
  }
`;

const IconsHolderStyle =css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:2%;
  &:hover {
    color: powderblue;
  }
`;

export  const ButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  gap:20%;
  opacity:1;
  padding:5%;
`;

export const BackgroundContainer = styled.div`
  width: 100vw;
  display: ruby-text;   
`;
export const ButtonContainerHeading = styled.div``;




export const InputContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding: 2%;
  gap: 5%;
`;


export const Label =styled.label`
  font-weight:bold;
  font-size:75%;
  align-text:center;
  justfy-content:center;
  width:30%;
  text-align:right;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid  #ccc;
  border-radius: 15px;
  font-size: 14px;
  width:50%;
`;
export const Container = styled.form`
  width: 40%;
  padding: .5%;
  align-content: center;
  color: cadetblue;
  font-size: 24px;
  background-color: aliceblue;
  border-radius: 8%;
  text-align:center;
`;

export const ContainerHeading = styled.div`
  align-content: center;
  background-color: transparent;
  text-align:center;
  padding:3%;
  font-weight:bold;
  font-size:150%;
  color:darkgoldenrod;

`;
export const ErrorMessageContainer = styled.div`
  width: 100%;  
  align-content: center;
  color: red;
  font-size: 16px;
  background-color: aliceblue;  
  text-align:center;
`;

export const MessageContainer = styled.div`
  width: 100%;  
  align-content: center;
  color: darkgoldenrod;
  font-size: 16px;
  background-color: aliceblue;  
  text-align:center;
`;

export const IconsHolderStyledHomeIcon =styled.div`
  ${IconsHolderStyle}
`

export const IconsContainer = styled.div`
  color:white;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin:2% 0;
`;

export const IconsHolder = styled.div`
  width:25%;
`;

export const IconLabel = styled.label`
  color:black;
  background-color:transparent;
  font-size: 16px;
  font-weight:normal;
  &:hover {
    color: powderblue;
  }
`;


//================================User/OrganizerLoginForm===============================//

export const UserLoginFormHeading = styled.div`

  color: darkgoldenrod;
  font-size: 24px;
  background-color: transparent;
  text-align:center;
  font-weight:bold;
`;



//================================Add/Edit Program===============================//

export const ProgramInputContainer =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;    
  padding:0.5%;

`;

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const Arrow = styled.div`
  content: '';
  position: absolute;
  top: 50%;
  right: 10px;
  width: 10px;
  height: 10px;
  background-image: url('data:image/svg+xml;base64,<base64-encoded-image>');
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
  transform: translateY(-50%);
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid  #ccc;
  border-radius: 15px;
  font-size: 14px;
  width:53%;

  &:hover,
  &:focus {
    border-color: #777;
  }
`;
export const BigLabel =styled.label`
  font-weight:bold;
  font-size:75%;
  align-text:center;
  justfy-content:center;
  width:50%;
  text-align:right;
`;

export const NavLink = styled(Link)`
  font-size:15px;
  padding:3%;
  color:cadetblue;

  &:hover {
    color:powderblue;
  
`
export const ForgetPassword =styled.div`
    text-align:end;
    margin: 0 5% 3% 0;
`



export const InputHolder =styled.div`
  gap:10%;
`;