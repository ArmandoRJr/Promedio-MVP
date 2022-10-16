import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import styled from 'styled-components'
import { isAuthUserValid }from '../utils/validate';
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
    // get authUser from localStorage
    const localUser = localStorage.getItem('authUser');
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      if (isAuthUserValid(parsedUser)) {
        setAuthUser(parsedUser);
        navigate('/home');
      } else {
        localStorage.removeItem('authUser');
        navigate('/welcome');
      }
    } else {
      navigate('/welcome');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isAuthUserValid(authUser)) {
      localStorage.setItem('authUser', JSON.stringify(authUser));
      navigate('/home');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <AppContainer>
      <Navbar authUser={authUser} logout={() => {
        setAuthUser(undefined);
        localStorage.removeItem('authUser');
        navigate('/welcome');
      }}/>
      <Outlet context={{
        setAuthUser: setAuthUser,
        authUser: authUser
      }} />
    </AppContainer>
  );
}

export default App;
