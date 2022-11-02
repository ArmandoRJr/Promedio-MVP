import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components'
import { get } from '../api';
import Courses from '../components/EditCourseForm';

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

const Heading = styled.h2`
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CourseCard = styled.div`
  background-color: ${({theme}) => theme.colors.white};
  color: ${({theme}) => theme.colors.black};
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  width: 80%;
`;

function CourseDetails() {
  const navigate = useNavigate();
  // get id from react router
  const { id, courseId } = useParams();
  const [course, setCourse] = React.useState(undefined);
  const [isEditing, setIsEditing] = React.useState(false);


  // on load make a get request to courses
  React.useEffect(() => {
    if (!id) {
      navigate('/semesters');
      return;
    }
    if (!courseId) {
      navigate(`/semesters/${id}`);
      return;
    }
    handleGetCourse();
  }, []);

  const handleGetCourse = () => {
    get(`course/${id}`).then((res) => {
      setCourse(res.data);
    });
  };

  return (
    <FullWidthDiv>
      <CenteredDiv>
        <BackButton onClick={() => navigate(`/semesters/${id}`)}>Back</BackButton>

        {isEditing ? (
          <Courses
            id={courseId}
            semester={id}
            open={isEditing}
            course={course}
            handleClose={() => {
              setIsEditing(false);
              handleGetCourse();
            }}
          />
        ) : (
            course ? (
              <CourseCard>
                  <h1>Course</h1>
                  <InfoContainer>
                    <Heading>Name</Heading>
                    <h3>{course.name}</h3>
                  </InfoContainer>
                  <InfoContainer>
                    <Heading>Description</Heading>
                    <h3>{course.description}</h3>
                  </InfoContainer>
                  <InfoContainer>
                    <Heading>Mark Goal</Heading>
                    <h3>{course.markGoal}</h3>
                </InfoContainer>
                  <CourseButton onClick={() => { setIsEditing(true) }}>
                    Edit Course
                  </CourseButton>
                </CourseCard>
            ) : (
              <h3>Course not found.</h3>
            )
        )}
      </CenteredDiv>
    </FullWidthDiv>
  );
}

export default CourseDetails;
