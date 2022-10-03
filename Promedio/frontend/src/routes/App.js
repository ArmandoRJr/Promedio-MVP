import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import styled from 'styled-components'
import { Navbar } from '../components/Navbar';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(window.location.pathname)
    if (!isLoggedIn && !window.location.pathname.includes('login') && !window.location.pathname.includes('signup')) {
      navigate('/welcome');
    } else if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <AppContainer>
      <Navbar isLoggedIn={isLoggedIn} logout={() => {
        setIsLoggedIn(false);
      }}/>
      <Outlet context={{setIsLoggedIn}} />
    </AppContainer>
  );
}

export default App;
