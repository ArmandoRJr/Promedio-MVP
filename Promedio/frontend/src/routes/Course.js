import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components'
import { get, patch } from '../api';

const FullWidthDiv = styled.div`
  width: 100%;
  ${'' /* height: 500px; */}
  height: 100vh;
  background-color: ${({theme}) => theme.colors.primary };
  color: ${({theme}) => theme.colors.white};
  padding: 0px;
`;


const CourseButton = styled.button`
  background-color: ${({theme}) => theme.colors.secondary};
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

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

// create a thin text button that is a back button
const BackButton = styled.button`
  background-color: transparent;
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

const CourseCard = styled.div`
  background-color: ${({theme}) => theme.colors.white};
  color: ${({theme}) => theme.colors.black};
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
  }
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

const FormInput = styled.input`
  background-color: ${({theme}) => theme.colors.white};
  color: ${({theme}) => theme.colors.black};
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
`;

function CourseDetails() {
  const navigate = useNavigate();
  // get id from react router
  const { id, courseId } = useParams();
  const [course, setCourse] = React.useState(undefined);
  const [formState, setFormState] = React.useState({
    name: '',
  });
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (course?.name) {
      setFormState({
        name: course?.name,
      });
    }
  }, [course]);

  // on load make a get request to courses
  React.useEffect(() => {
    if (!id) {
      navigate('/semesters');
    }
    if (!courseId) {
      navigate(`/semesters/${id}`);
    }
    get(`course/${id}`).then((res) => {
      setCourse(res.data);
    });
  }, []);

  return (
    <FullWidthDiv>
      <CenteredDiv>
        <BackButton onClick={() => navigate(`
          /semesters/${id}
        `)}>Back</BackButton>

        {isEditing ? (
          <FlexRow>
          <FormInput
            type="text"
            value={formState.name}
            onChange={(e) => setFormState({...formState, name: e.target.value})}
          />
          <CourseButton onClick={() => {
            if (formState.name !== course.name) {
              patch(`course/${id}`, {name: formState.name}).then((res) => {
                setCourse({
                  ...course,
                  name: formState.name,
                });
                setIsEditing(false);
              });
            } else {
              setIsEditing(false);
            }
           }}>
            Save
           </CourseButton>
          </FlexRow>
        ) : <CourseButton onClick={() => { setIsEditing(true) }}>
            Edit Course
          </CourseButton>}
        <h1>{course?.name}</h1>
      </CenteredDiv>
    </FullWidthDiv>
  );
}

export default CourseDetails;
