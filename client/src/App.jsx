
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx'
import UserHomePage from './pages/UserHomePage.jsx'
import OrganizerHomePage from './pages/OrganizerHomePage.jsx';


import UserDetails from './components/UserDetails.jsx';
import UserLogInForm from './components/UserLogInForm.jsx';
import UserSignUpForm from './components/UserSignUpForm.jsx';
import UserPasswordResetRequestForm from './components/UserPasswordResetRequestForm.jsx';
import UserPasswordResetForm from './components/UserPasswordResetForm.jsx';

import OrganizerDetails from'./components/OrganizerDetails.jsx';
import OrganizerLogInForm from './components/OrganizerLogInForm.jsx';
import OrganizerSignUpForm from './components/OrganizerSignUpForm.jsx';
import OrganizerPasswordResetRequestForm from './components/OrganizerPasswordResetRequestForm.jsx';
import OrganizerPasswordResetForm from'./components/OrganizerPasswordResetForm.jsx';

import ProgramAddNewForm from './components/ProgramAddNewForm.jsx'
import ProgramEditForm from './components/ProgramEditForm.jsx'


import ContactPage from './pages/ContactPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

const  App = () => {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path= '/' element={<WelcomePage />} />
          
          <Route path= '/user-home' element={<UserHomePage />} />
          <Route path= '/user-login' element={<UserLogInForm/>} />
          <Route path= '/user-getData' element={<UserDetails />} />
          <Route path= '/user-signup' element={<UserSignUpForm />} />
          <Route path= '/user-resetPasswordRequest'   element={<UserPasswordResetRequestForm/>}/>
          <Route path= '/user-resetPassword/:resetToken/:email' element={<UserPasswordResetForm  />} />
                    
          <Route path= '/organizer-home' element={<OrganizerHomePage />} />
          <Route path= '/organizer-login' element={<OrganizerLogInForm/>} />
          <Route path= '/organizer-getData' element={<OrganizerDetails />} />
          <Route path= '/organizer-signup' element={<OrganizerSignUpForm />} />
          <Route path= '/organizer-resetPasswordRequest'   element={<OrganizerPasswordResetRequestForm/>}/>
          <Route path= '/organizer-resetPassword/:resetToken/:email' element={<OrganizerPasswordResetForm  />} />
                    
          <Route path= '/program-addNew' element={<ProgramAddNewForm />} />
          <Route path= '/program-edit/:id' element={<ProgramEditForm />} />

          <Route path= '/about' element={<AboutPage />} />
          <Route path= '/contact' element={<ContactPage />} />
        </Routes>
      </Router>

    </>
  )
}


export default App;
