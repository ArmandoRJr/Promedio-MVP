import React from 'react';
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <AppContainer>
      <h3>Login</h3>
    </AppContainer>
  );
}

export default App;
