import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom'

import OrganizerLoginFormBackgroundImg from '../images/d.png';
import UserLoginFormBackgroundImg from '../images/c1.png';
import UserLoginFormImg from '../images/loginBackground1.png'
import UserSignUpFormBackgroundImg from '../images/d.png'
import OrganizerSignUpFormBackgroundImg from '../images/f.png'
import OrganizerPasswordResetRequestFormBackgroundImg from '../images/d.png'  
//==================================== General ===================================//

// Base styles
const baseButtonStyles = css`
  padding: 10px 20px;
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #45a049; /* Darker Green */
  }
`;

// Button component
export const Button = styled.button`
  ${baseButtonStyles}
`;

export const BackgroundContainer = styled.div`
  width: 100%;
  text-align:center;
   
`

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







//================================ WelcomePageHeading ===============================//

export const WelcomePageMainHeading = styled.div`
    text-weight:120px;
`



//================================UserLoginForm===============================//



// export const UserLoginFormBackgroundContainerImg = styled.div`
//   background-image: url(${UserLoginFormImg});
//   background-size: cover;
//   max-width: 1200px;
//   width: 100%;
//   height: fit-content;
//   align-content: center;
//   color: darkgoldenrod;
//   font-size: 24px;
//   background-color: whitesmoke;
//   align-self:center;
// `;

export const UserLoginFormHeading = styled.div`
  color: darkgoldenrod;
  font-size: 24px;
  background-color: transparent;
  text-align:center;
  font-weight:bold;
`;




// Media queries for responsiveness
const breakpoints = {
  mobile: '600px',
  tablet: '768px',
  laptop: '1024px',
};

export const media = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tablet: `(min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  laptop: `(min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.laptop})`,
};

// export const UserLoginFormBackgroundContainerImg = styled.div`
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

//   @media ${media.tablet} {
//     padding: 30px;
//   }
// `;

// export const UserLoginFormHeading = styled.h2`
//   color: #333; /* Dark Gray */
//   margin-bottom: 20px;

//   @media ${media.tablet} {
//     font-size: 24px;
//   }
// `;

// // WelcomePageHeadingText
// export const WelcomePageHeadingText = styled.div`
//   font-size: 36px;
//   font-weight: bold;
//   color: #333; /* Dark Gray */
//   margin-bottom: 20px;

//   @media ${media.tablet} {
//     font-size: 48px;
//   }
// `;

