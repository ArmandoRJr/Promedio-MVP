import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import Sidebar from '../components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const FullWidthDiv = styled.div`
  width: 100%;
  ${'' /* height: 500px; */}
  height: 100vh;
  background-color: ${({theme}) => theme.colors.primary };
  color: ${({theme}) => theme.colors.white};
  padding: 0px;
`;

const MarginTopRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

// const LoginButton = styled.button`
//   background-color: ${({theme}) => theme.colors.secondary};
//   color: ${({theme}) => theme.colors.white};
//   cursor: pointer;
//   padding: 10px 20px;
//   margin-right: 20px;
//   border: none;
//   border-radius: 5px;
//   &:hover {
//     opacity: 0.8;
//   }
//   font-size: 1.2rem;
//   font-weight: bold;
// `;

function Welcome() {
  const navigate = useNavigate();

  return (
    <FullWidthDiv>
      <Sidebar />
    </FullWidthDiv>
  );
}

export default Welcome;
