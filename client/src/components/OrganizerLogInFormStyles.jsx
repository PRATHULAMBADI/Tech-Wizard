import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

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


export const IconsHolderStyledHomeIcon =styled.div`
  ${IconsHolderStyle}
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

export const NavLink = styled(Link)`
  font-size:15px;
  padding:3%;
  color:cadetblue;
  &:hover {
    color:powderblue;
`;

export const ForgetPassword =styled.div`
    text-align:end;
    margin: 0 5% 3% 0;
`;

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

export const ErrorMessageContainer = styled.div`
  width: 100%;  
  align-content: center;
  color: red;
  font-size: 16px;
  background-color: aliceblue;  
  text-align:center;
`;

//------------------------MediaQuery-------------------//

const customMediaQuery = 'max-width: 768px';

export const ResponsiveContainer = styled(Container)`
  @media only screen and (${customMediaQuery}) {
    width: 80%;
    font-size: 18px;
  }
`;

export const ResponsiveInput = styled(Input)`
  @media only screen and (${customMediaQuery}) {
    width: 80%;
  }
`;