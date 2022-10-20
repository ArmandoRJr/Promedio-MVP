import { React } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import { Card } from "../components/Card";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FullWidthDivTop = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 55vh;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  h1 {
    font-size: calc(90px + 1vw);
  }

  h3 {
    font-size: 30px;
  }
  flex-wrap: wrap;
`;

const FullWidthDivBottom = styled(FullWidthDivTop)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary_light};
  display: flex;
  flex-direction: column;
  padding: 10px;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(50px + 1vw);
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 50px;
  flex-wrap: wrap;
  gap: 30px;
`;

const LeftColumnDiv = styled.div`
  flex: 0.5;
  padding: 60px;
`;

const RightColumnDiv = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  img {
    transition: 0.3s opacity ease-in;
    opacity: 1;
  }

  &:hover {
    img {
      transition: 0.3s opacity ease-in;
      opacity: 0.3;
    }
  }
`;

const BGImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
`;

const LoginButton = styled.button`
  position: absolute;
  top: 25%;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  width: 15rem;
  height: 4rem;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  &:hover {
    transition: 0.2s background ease-in;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
  font-size: 1.5rem;
  font-weight: bold;
`;

const SignupButton = styled(LoginButton)`
  top: 35%;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
  border: 2px solid ${({ theme }) => theme.colors.white};
`;

function Welcome() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <FullWidthDivTop>
        <LeftColumnDiv>
          <h1>Promedio.</h1>
          <h3>
            <Typewriter
              options={{
                strings: ['Your average planner.', 'Your average grade calculator.', 'Your average course organizer.', 'Your average progress tracker.'],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>
        </LeftColumnDiv>
        <RightColumnDiv>
          <BGImage src="bg.jpg" />
          <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
          <SignupButton onClick={() => navigate("/signup")}>Signup</SignupButton>
        </RightColumnDiv>
      </FullWidthDivTop>
      <FullWidthDivBottom>
          <h1>What we offer?</h1>
          <CardsContainer>
            <Card img="track.png" title="Track" desc="Keep track of your current grades with ease of streamlined spreadsheets. Also stay up to date with your progress and goals."/>
            <Card img="plan.png" title="Plan" desc="Plan out your semester with proper course organization. Create subsets of courses and perform various evalutations on them."/>
            <Card img="visualize.png" title="Visualize" desc="Clearly visualize your data with our appealing user interface. Export data into various formats and even generate graphs with your grades/cGPA."/>
          </CardsContainer>
      </FullWidthDivBottom>
    </PageContainer>
  );
}

export default Welcome;
