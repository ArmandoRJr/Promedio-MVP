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
  const [authUser, setAuthUser] = React.useState(undefined);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authUser && !window.location.pathname.includes('login') && !window.location.pathname.includes('signup')) {
      console.log(authUser)
      navigate('/welcome');
    }
  }, [authUser, navigate]);

  return (
    <AppContainer>
      <Navbar authUser={authUser} logout={() => {
        setAuthUser(undefined);
      }}/>
      <Outlet context={{
        setAuthUser: setAuthUser,
        authUser: authUser
      }} />
    </AppContainer>
  );
}

export default App;
