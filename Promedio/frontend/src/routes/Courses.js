import React from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { get, patch, post } from '../api/index';
import { isCourseValid, isResponseValid } from "../utils/validate";

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

const FormTextArea = styled.textarea`
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
const Heading = styled.h2`
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

function Courses() {
  const navigate = useNavigate();
  const [formState, setFormState] = React.useState({
    _id: '',
    name: '',
    description: '',
    markGoal: '',
  });
  // id means there is an existing course that you are editing
  const { id } = useParams();
  const [isEditable, setIsEditable] = React.useState(!id);

  const handleChangeFormState = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    if (id) {
      get(`/courses/${id}`).then((response) => {
        if (isResponseValid(response) && isCourseValid(response.data.course)) {
          setFormState({
            ...formState,
            ...response.data,
          });
        }
      }).catch((error) => {
        console.log(error);
        navigate('/home');
        // Course not found
      });
    }
  }, [formState, id, navigate]);

  function handleClick() {
    // TODO: Add validation
    if (id) {
      post(`/courses/${id}`, formState).then((response) => {
        if (isResponseValid(response) && isCourseValid(response.data.course)) {
          setFormState({
            ...formState,
            ...response.data,
          });
        }
      });
    } else {
      patch('/courses', formState).then((response) => {
        if (isResponseValid(response) && isCourseValid(response.data.course)) {
          setFormState({
            ...formState,
            ...response.data,
          });
        }
      }
      );
    }
  }

  if (!isEditable) {
    return (
      <FullWidthDiv>
        <h1>Course.</h1>
        <InfoContainer>
          <Heading>Name</Heading>
          <h3>{formState.name}</h3>
        </InfoContainer>
        <InfoContainer>
          <Heading>Description</Heading>
          <h3>{formState.description}</h3>
        </InfoContainer>
        <InfoContainer>
          <Heading>Mark Goal</Heading>
          <h3>{formState.markGoal}</h3>
        </InfoContainer>
        <MarginTopRow>
          <UserButton onClick={() => setIsEditable(true)}>Edit</UserButton>
        </MarginTopRow>
      </FullWidthDiv>
    )
  }

  return (
    <FullWidthDiv>
      <h1>{id ? 'Edit' : 'Add'} Course</h1>
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
        <Heading>Description</Heading>
        <FormTextArea
          type="text"
          placeholder="Add a course description"
          onChange={handleChangeFormState}
          value={formState.description}
          name="description"
        />
      </InfoContainer>
      <InfoContainer>
        <Heading>Mark Goal</Heading>
        <FormInput
          type="text"
          placeholder="i.e 80%"
          onChange={handleChangeFormState}
          value={formState.markGoal}
          name="markGoal"
        />
      </InfoContainer>
      <MarginTopRow>
        <UserButton onClick={handleClick}>Save</UserButton>
        <UserButton onClick={() => {
          // If you're adding a new course and hit cancel
          // you should be redirected to the home page
          if (id) {
            setIsEditable(false);
          } else {
            navigate('/home');
          }
        }}
      >Cancel</UserButton>
      </MarginTopRow>
    </FullWidthDiv>
  );
}

export default Courses;
