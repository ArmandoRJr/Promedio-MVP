import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { patch, post, del } from '../api/index';

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

function Category({handleClose, id, category, course}) {
  const navigate = useNavigate();
  const [formState, setFormState] = React.useState({
    name: category?.name || "",
    weight: category?.weight || "",
    courseId: course,
    numAssessments: category?.numAssessments || "",
    id: id
  });

  const handleChangeFormState = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    if (course) {
      setFormState({
        ...formState,
        courseId: course,
      });
    }
  }, [course]);


  React.useEffect(() => {
    if (category) {
      setFormState({
        ...formState,
        name: category.name,
        weight: category.weight,
        numAssessments: category.numAssessments
      });
    }
  }, [category]);

  function handleClick() {
    // TODO: Add validation
    if (id) {
      post(`editCategory/`, formState).then((response) => {
        setFormState({
          ...formState,
          ...response.data,
        });
        handleClose();
      });
    } else {
      post('addCategory', formState).then((response) => {
        setFormState({
          ...formState,
          ...response.data,
        });
        handleClose();
      }
      );
    }
  }


  return (
    <FullWidthDiv>
      <h1>{id ? 'Edit' : 'Add'} Category</h1>
      <InfoContainer>
        <Heading>Name</Heading>
        <FormInput
          type="text"
          name="name"
          placeholder="Assignment"
          value={formState.name}
          onChange={handleChangeFormState}
        />
      </InfoContainer>
      <InfoContainer>
        <Heading>Weight</Heading>
        <FormInput
          type="text"
          placeholder="i.e 10%"
          onChange={handleChangeFormState}
          value={formState.weight}
          name="weight"
        />
      </InfoContainer>
      <InfoContainer>
        <Heading>Number of Assessments</Heading>
        <FormInput
          type="text"
          placeholder="i.e. 10"
          onChange={handleChangeFormState}
          value={formState.numAssessments}
          name="numAssessments"
        />
      </InfoContainer>
      <MarginTopRow>
        <UserButton onClick={handleClick}>Save</UserButton>
        <UserButton onClick={() => {
            handleClose();
        }}
      >Cancel</UserButton>
      </MarginTopRow>
    </FullWidthDiv>
  );
}

export default Category;