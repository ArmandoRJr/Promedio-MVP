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
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return (
    <AppContainer>
      <h1>Promedio</h1>
      <Navbar />
      {isLoggedIn ? (
        <>
          {/* main app stuff will go in here */}
        </>
      ) : (
        <>
        <h2>Welcome to Promedio!</h2>
        </>
      )}
      <Outlet />
    </AppContainer>
  );
}

export default App;
