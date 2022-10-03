import React from "react";
import { useOutletContext } from "react-router";
import styled from "styled-components";
import { post } from '../../src/api/index';

const FullWidthDiv = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 100px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarginTopRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const SignupButton = styled.button`
  background-color: ${({theme}) => theme.colors.secondary};
  color: ${({theme}) => theme.colors.white};
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
  }
  font-size: 1.2rem;
  font-weight: bold;
`;

const FormInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  width: 100%;
  &:focus {
    outline: none;
  }
  width: 500px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 20px 0;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

function Signup() {
  let gpa = "";
  let email = "";
  let name = "";
  let pass = "";
  const context = useOutletContext();
  const {setIsLoggedIn} = context;


  let jsonData = {
    name: name,
    email: email,
    gpa: gpa,
    password: pass,
  };

  const getGPAValue = (event) => {
    // show the user input value to console
    gpa = event.target.value;
    jsonData.gpa = gpa;
  };
  const getEmailValue = (event) => {
    // show the user input value to console
    email = event.target.value;
    jsonData.email = email;
  };
  const getNameValue = (event) => {
    // show the user input value to console
    name = event.target.value;
    jsonData.name = name;
  };
  const getPassValue = (event) => {
    // show the user input value to console
    pass = event.target.value;
    jsonData.password = pass;
  };

  function handleClick() {
    console.log(jsonData);
    post(`register`, jsonData).then(
      (response) => {
        if (setIsLoggedIn && typeof setIsLoggedIn === 'function') {
          setIsLoggedIn(true)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <FullWidthDiv>
      <h1>Signup.</h1>
      <InputContainer>
        <Label>Name</Label>
        <FormInput type="text" placeholder="John Doe" onChange={getNameValue} />
      </InputContainer>
      <InputContainer>
        <Label>Email</Label>
        <FormInput
          type="text"
          placeholder="john.doe@mail.utoronto.ca"
          onChange={getEmailValue}
        />
      </InputContainer>
      <InputContainer>
        <Label>Gpa</Label>
        <FormInput type="text" placeholder="3.4" onChange={getGPAValue} />
      </InputContainer>
      <InputContainer>
        <Label>Password</Label>
        <FormInput type="password" onChange={getPassValue} />
      </InputContainer>
      <MarginTopRow>
        <SignupButton onClick={handleClick}>Signup</SignupButton>
      </MarginTopRow>
    </FullWidthDiv>
  );
}

export default Signup;
