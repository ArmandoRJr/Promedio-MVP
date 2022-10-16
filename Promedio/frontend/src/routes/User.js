import React from "react";
import { useOutletContext } from "react-router";
import styled from "styled-components";
import { post } from '../api/index';

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

const UserButton = styled.button`
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

function User() {
  const context = useOutletContext();
  const {setAuthUser, authUser} = context;
  const [formState, setFormState] = React.useState({
    email: authUser.email ?? '',
    name: authUser.password ?? '',
    password: authUser ?? '',
  });
  const [isEditable, setIsEditable] = React.useState(false);

  const handleChangeFormState = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  function handleClick() {
    // TODO: Add validation
    post(`register`, formState).then(
      (response) => {
        if (setAuthUser && typeof setAuthUser === 'function') {
          setAuthUser(true)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  if (!isEditable) {
    <FullWidthDiv>
      <h1>User Profile.</h1>
      <InputContainer>
        <Label>Name</Label>
        <h3>{}</h3>
      </InputContainer>
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
        <UserButton onClick={handleClick}>Save</UserButton>
      </MarginTopRow>
    </FullWidthDiv>
  }

  return (
    <FullWidthDiv>
      <h1>User Profile.</h1>
      <InputContainer>
        <Label>Name</Label>
        <FormInput
          type="text"
          name="name"
          placeholder="John Doe"
          onChange={handleChangeFormState}
        />
      </InputContainer>
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
        <UserButton onClick={handleClick}>Save</UserButton>
      </MarginTopRow>
    </FullWidthDiv>
  );
}

export default User;
