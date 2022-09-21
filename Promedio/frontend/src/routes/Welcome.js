import styled from 'styled-components'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Home() {
  return (
    <HomeContainer>
      <h1>Promedio</h1>
      <h2>You are logged in!</h2>
    </HomeContainer>
  );
}

export default Home;
