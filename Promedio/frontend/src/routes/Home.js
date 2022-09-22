import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components'

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
  cursor: pointer;
  padding: 10px 20px;
  margin-right: 20px;
  border: none;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
  }
  font-size: 1.2rem;
  font-weight: bold;
`;

const SignupButton = styled(LoginButton)`
  background-color: ${({theme}) => theme.colors.white};
  &:hover {
    opacity: 0.8;
  }
  color: ${({theme}) => theme.colors.black};
  margin-right: 0;
`;
function Welcome() {
  const navigate = useNavigate();

  return (
    <FullWidthDiv>
      <h1>CSCA48.</h1>
      <MarginTopRow>
      </MarginTopRow>
    </FullWidthDiv>
  );
}

export default Welcome;
