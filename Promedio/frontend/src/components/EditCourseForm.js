import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { patch, post, del } from '../api/index';
import { isCourseValid } from "../utils/validate";

const FullWidthDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 100px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
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
  margin: 10px;
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
`;
const Heading = styled.h2`
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

function Courses({handleClose, id, semester, course}) {
  const navigate = useNavigate();
  const [formState, setFormState] = React.useState({
    name: course?.name || "",
    description: course?.description || "",
    markGoal: course?.markGoal || "",
    semester: semester,
  });

  const handleChangeFormState = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    if (semester) {
      setFormState({
        ...formState,
        semester: semester,
      });
    }
  }, [semester]);


  React.useEffect(() => {
    if (course) {
      setFormState({
        ...formState,
        name: course.name,
        description: course.description,
        markGoal: course.markGoal,
      });
    }
  }, [course]);

  function handleClick() {
    // TODO: Add validation
    if (id) {
      patch(`course/${id}`, formState).then((response) => {
        if (isCourseValid(response)) {
          setFormState({
            ...formState,
            ...response.data,
          });
        }
        handleClose();
      });
    } else {
      post('course', formState).then((response) => {
        if (isCourseValid(response)) {
          setFormState({
            ...formState,
            ...response.data,
          });
        }
        handleClose();
      }
      );
    }
  }

  function handleDelete() {
    del(`course/${id}`).then((response) => {
      handleClose();
    });
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
        {!!id &&
        <UserButton onClick={handleDelete}>Delete</UserButton>}
        <UserButton onClick={() => {
            handleClose();
        }}
      >Cancel</UserButton>
      </MarginTopRow>
    </FullWidthDiv>
  );
}

export default Courses;