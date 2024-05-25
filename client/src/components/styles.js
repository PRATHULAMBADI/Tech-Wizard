import styled from 'styled-components';
import { Link } from 'react-router-dom'

import OrganizerLoginFormBackgroundImg from '../images/d.png';
import UserLoginFormBackgroundImg from '../images/c1.png';
import UserLoginFormImg from '../images/loginBackground1.png'
import UserSignUpFormBackgroundImg from '../images/d.png'
import OrganizerSignUpFormBackgroundImg from '../images/f.png'
import OrganizerPasswordResetRequestFormBackgroundImg from '../images/d.png'  
//==================================== General ===================================//

export const Button = styled.button`
  // padding: 5% 8%;
  background-color:transparent;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size:15px;

  &:hover {
    background-color:transparent;
    color:darkgoldenrod;
  }
`;
export  const ButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  gap:15%;
  opacity:1;
  padding:2%;
`;

export const InputHolder =styled.div`
  gap:10%;

`

export const InputContainer = styled.div`
  display:flex;
  justify-content:center;
  padding: 2%;
  gap: 5%;
`;

export const Label =styled.label`
  font-weight:bold;
  width:100px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid  #ccc;
  border-radius: 15px;
  font-size: 14px;
  width: 300px;
`;

export const Container = styled.form`
  width: 50%;
  padding: .5%;
  height: fit-content;
  align-content: center;
  color: darkgoldenrod;
  font-size: 24px;
  background-color: whitesmoke;
  align-self:center;
`;

export const NavLink = styled(Link)`
  font-size:15px;
  padding:3%;
  color:darkgoldenrod;

  &:hover {
    color:#fff;
  
`
export const ForgetPassword =styled.div`
    text-align:end;
    margin: 0 5% 3% 0;
`

//================================UserLoginForm===============================//

export const UserLoginFormBackground = styled.div`
  background-image: url(${UserLoginFormBackgroundImg});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;  
`;

export const UserLoginFormBackgroundContainerImg = styled.div`
  background-image: url(${UserLoginFormImg});
  background-size: cover;
  max-width: 1200px;
  width: 100%;
  height: fit-content;
  align-content: center;
  color: darkgoldenrod;
  font-size: 24px;
  background-color: whitesmoke;
  align-self:center;
`;

export const UserLoginFormHeading = styled.div`
  color: darkgoldenrod;
  font-size: 24px;
  background-color: transparent;
  text-align:center;
  font-weight:bold;
`;

//================================ UserSignUpForm ===============================//

export const UserSignUpFormBackground = styled.div`
  background-image: url(${UserSignUpFormBackgroundImg});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
`;

//================================ OrganizerPasswordResetRequestForm ===============================//

export const OrganizerPasswordResetRequestFormBackground = styled.div`
  background-image: url(${OrganizerPasswordResetRequestFormBackgroundImg});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
`;

//================================ OrganizerLogInForm ===============================//

export const OrganizerLoginFormBackground = styled.div`
  background-image: url(${OrganizerLoginFormBackgroundImg});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
  
`;

//================================ OrganizerSignUpForm ===============================//

export const OrganizerSignUpFormBackground = styled.div`
  background-image: url(${OrganizerSignUpFormBackgroundImg});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
`;

