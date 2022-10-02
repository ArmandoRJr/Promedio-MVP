import { React } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Typewriter from "typewriter-effect";

const FullWidthDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50vh;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  h1 {
    font-size: calc(90px + 1vw);
  }

  h3 {
    font-size: 25px;
  }
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

  &:hover {
    img {
      transition: .3s opacity ease-in;
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
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.white};
  width: 15rem;
  height: 4rem;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  &:hover {
    transition: .2s background ease-in;
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
    <FullWidthDiv>
      <LeftColumnDiv>
        <h1>Promedio.</h1>
        <h3>
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("Your average ").pauseFor(2000)
              .typeString("planner.").pauseFor(2000).deleteChars(8)
              .typeString("grade calculator.").pauseFor(2000).deleteChars(17)
              .typeString("course organizer.").pauseFor(2000).deleteChars(17)
              .typeString("progress tracker.").pauseFor(2000).deleteChars(17)
              .typeString("planner.")
              .start();
            }}
          />
        </h3>
      </LeftColumnDiv>
      <RightColumnDiv>
          <BGImage src="bg.jpg" />
          <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
          <SignupButton onClick={() => navigate("/signup")}>Signup</SignupButton>
      </RightColumnDiv>
    </FullWidthDiv>
  );
}

export default Welcome;
