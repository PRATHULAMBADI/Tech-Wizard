import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom'

// import OrganizerLoginFormBackgroundImg from '../images/d.png';
// import UserLoginFormBackgroundImg from '../images/c1.png';
// import UserLoginFormImg from '../images/loginBackground1.png'
// import UserSignUpFormBackgroundImg from '../images/d.png'
// import OrganizerSignUpFormBackgroundImg from '../images/f.png'
// import OrganizerPasswordResetRequestFormBackgroundImg from '../images/d.png'  
//==================================== General ===================================//

// Base styles
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

// Button component
export const Button = styled.button`
  ${baseButtonStyles}
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
   
`
export const ButtonContainerHeading = styled.div`
  
   
`


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

`

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
  width:50%;
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
  font-size:100%;

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










//================================ WelcomePageHeading ===============================//

export const WelcomePageMainHeading = styled.div`
  font-size: 50%;
  font-weight: bold;
  text-align:center;
  color: cadetblue;
  position center;
  padding: 1% 0 0 0;
`

export const WelcomePageMainHeadingIcon = styled.img`
  width:8%;
  height:8%;
  color: cadetblue;
  position: relative;
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

