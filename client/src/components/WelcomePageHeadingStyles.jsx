import styled, { css } from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';


export const StyledHomeIcon = styled(HomeIcon)`
  color: black;
  font-size: 40px;
  &:hover {
    color: powderblue;
    title:"home";
  }
`;

export const BackgroundContainer = styled.div`
  width: 100vw;
  display: ruby-text;
`;

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
  `;