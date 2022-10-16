import React from "react";
import { useNavigate, useOutletContext } from "react-router";
import styled from "styled-components";
import { post } from '../../src/api/index';
import { isAuthUserValid } from "../utils/validate";

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

const LoginButton = styled.button`
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

function Login() {
  const context = useOutletContext();
  const {setAuthUser} = context;
  const navigate = useNavigate();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  const handleChangeFormState = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  function handleClick() {
    // TODO: Add validation
    post(`login`, formState).then(
      (response) => {
        if (setAuthUser && typeof setAuthUser === 'function' && isAuthUserValid(response)) {
          setAuthUser(response.data.user)
          navigate('/home');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <FullWidthDiv>
      <h1>Login.</h1>
      <InputContainer>
        <Label>Email</Label>
        <FormInput
          type="text"
          placeholder="john.doe@mail.utoronto.ca"
          onChange={handleChangeFormState}
          name="email"
        />
      </InputContainer>
      <InputContainer>
        <Label>Password</Label>
        <FormInput
          type="password"
          onChange={handleChangeFormState}
          name="password"
        />
      </InputContainer>
      <MarginTopRow>
        <LoginButton onClick={handleClick}>Login</LoginButton>
      </MarginTopRow>
    </FullWidthDiv>
  );
}

export default Login;
