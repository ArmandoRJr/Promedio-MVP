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

const FullWidthDiv = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.white};
  padding: 40px;
`;

const MarginTopRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  background-color: ${({theme}) => theme.colors.tertiary};
  color: ${({theme}) => theme.colors.white};
  padding: 10px 20px;
  margin-right: 20px;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: ${({theme}) => theme.colors.secondary};
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/welcome');
    }
  }, [isLoggedIn]);

  return (
    <AppContainer>
      <Navbar />
      <Outlet />
    </AppContainer>
  );
}

export default App;
