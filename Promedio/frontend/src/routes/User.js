import React from "react";
import { useOutletContext } from "react-router";
import styled from "styled-components";
import { post } from '../api/index';
import { isUserValid } from "../utils/validate";

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
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

const UserButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  width: 8rem;
  height: 3rem;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  &:hover {
    transition: 0.2s background ease-in;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
  font-size: 1.5rem;
`;

const FormInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 20px;
  font-size: 1.2rem;
  width: 100%;
  &:focus {
    outline: none;
  }
  width: 500px;
  margin: 10px 0;
`;

const Heading = styled.h2`
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
  h3 {
    color: ${({ theme }) => theme.colors.primary_light};
  }
`;

function User() {
  const context = useOutletContext();
  const {setAuthUser, authUser} = context;
  const [formState, setFormState] = React.useState({
    email: authUser?.email ?? '',
    name: authUser?.name ?? '',
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
    post(`editUser`, formState).then(
      (response) => {
        if (setAuthUser && typeof setAuthUser === 'function' && isUserValid(response)) {
          setAuthUser(response.data.user);
          setFormState({
            email: response.data.user.email,
            name: response.data.user.name,
          });
          setIsEditable(false)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function resetOnClick() {
    setFormState({
      email: authUser?.email ?? '',
      name: authUser?.name ?? '',
    });
    setIsEditable(false);
  }

  if (!isEditable) {
    return (
      <FullWidthDiv>
        <h1>User Profile.</h1>
        <InfoContainer>
          <Heading>Name</Heading>
          <h3>{formState.name}</h3>
        </InfoContainer>
        <InfoContainer>
          <Heading>Email</Heading>
          <h3>{formState.email}</h3>
        </InfoContainer>
        <MarginTopRow>
          <UserButton onClick={() => setIsEditable(true)}>Edit</UserButton>
        </MarginTopRow>
      </FullWidthDiv>
    )
  }

  return (
    <FullWidthDiv>
      <h1>User Profile.</h1>
      <InfoContainer>
        <Heading>Name</Heading>
        <FormInput
          type="text"
          name="name"
          placeholder="John Doe"
          value={formState.name}
          onChange={handleChangeFormState}
        />
      </InfoContainer>
      <InfoContainer>
        <Heading>Email</Heading>
        <FormInput
          type="text"
          placeholder="john.doe@mail.utoronto.ca"
          onChange={handleChangeFormState}
          value={formState.email}
          name="email"
        />
      </InfoContainer>
      <MarginTopRow>
        <UserButton onClick={handleClick}>Save</UserButton>
        <UserButton onClick={resetOnClick}>Cancel</UserButton>
      </MarginTopRow>
    </FullWidthDiv>
  );
}

export default User;
