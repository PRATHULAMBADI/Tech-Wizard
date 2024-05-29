import styled from 'styled-components';
// import { Link } from 'react-router-dom';

export const Button = styled.button`
  background-color:transparent;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size:15px;
 
  &:hover {
    background-color:transparent;
    color:darkgoldenrod;
  }
`;

export const ButtonContainer = styled.div`
  
`
export const Container = styled.div`
  
`


//================================ WelcomePage ===============================//


export const WelcomePageImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WelcomePageImage = styled.img`

  width:400px;
  height:350px;
  border-radius:15%;
`

export const WelcomePageContentHeading = styled.div`
  font-size:60px;
  text-align: center;
  padding: 0 5%;
  color:darkgoldenrod;
  font-weight: bold;
  text-stroke: 2px white;
  -webkit-text-stroke: 1.4px whitesmoke;
`
export const WelcomePageDetails = styled.div`
  padding: 0 12% 5%;
  text-align: justify;
`
export const BackgroundContainer = styled.div`
  width: 100vw;
  height: fit-content;
  align-content: center;  
`
export const WelcomePageButtonContainer = styled.div`
  width: 100%;
  background-color: cyan;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const WelcomePageButtonContainerHeading = styled.div`
  font-weight:bold;
  color:darkgoldenrod;  
`

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

export const UserSignUpFormBackground =styled.div`
    width:100vw;
`

//-----------------------------------------UserHomePageContainer/OrganizerHomePageContainer---------------------------------------------------//

export const HomePageContainer =styled.div`
  width:100vw;
`
export const HomePageUL =styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`
export const HomePageLI =styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 12%;
  text-align: center;
  transition: transform 0.2s;
  
  &:hover{
    transform: translateY(-5px); 
  }
`
export const HomePageLIHeading =styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const HomePageLIText =styled.p`
  font-size: 1rem;
  color: #666;
`;

export const HomePageLIImg =styled.img`
  width: 100%;
  
`;

export const HomePageLIEditButton =styled.div`
  
`;


//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------////-----------------------------------------UserSignUpFormBackground---------------------------------------------------//

//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
//-----------------------------------------UserSignUpFormBackground---------------------------------------------------//
