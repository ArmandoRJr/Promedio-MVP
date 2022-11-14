import React from 'react';
import styled from 'styled-components'
import { get } from '../api';

const FullWidthDiv = styled.div`
  width: 100%;
  ${'' /* height: 500px; */}
  height: 100vh;
  background-color: ${({theme}) => theme.colors.primary };
  color: ${({theme}) => theme.colors.white};
  padding: 0px;
`;


const SemesterButton = styled.button`
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

const SemesterCard = styled.div`
  background-color: ${({theme}) => theme.colors.white};
  color: ${({theme}) => theme.colors.black};
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
`;

const Checkbox = styled.input`
  margin: 0 10px;
`;

function GPA() {
  const [courses, setCourses] = React.useState([]);
  const [selectedCoursesIds, setSelectedCoursesIds] = React.useState([]);
  const [message, setMessage] = React.useState('');

  // on load make a get request to courses
  React.useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    get('course').then((res) => {
      setCourses(res.data);
    });
  };

  const calculateGPA = () => {
    if (selectedCoursesIds.length === 0) {setMessage(`No courses selected.`)}
    else {
      const queryArray = selectedCoursesIds.map(courseId => { return `courseIds[]=${courseId}` }).join("&")
      get(`calculations?${queryArray}`).then((res) => {
        setMessage(`Your GPA is: ${res.data.GPA}`);
      }).catch((err) => {
        setMessage(err.response.data.message ?? 'Something went wrong');
      });
    }
  };

  return (
    <FullWidthDiv>
      <CenteredDiv>
        <h1>Calculate your GPA for a Subset of courses</h1>
        {message && <h2>{message}</h2>}
        <div>
          {courses.map((course) => (
            <Row>
              <Checkbox
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCoursesIds([...selectedCoursesIds, course._id]);
                  }
                  else {
                    setSelectedCoursesIds(selectedCoursesIds.filter((id) => id !== course._id));
                  }
                }}
              />
              <SemesterCard key={course._id}>
                {course.name}
              </SemesterCard>
            </Row>
          ))}
          <SemesterButton onClick={() => {
            calculateGPA();
          }}>
            Calculate your GPA
          </SemesterButton>
        </div>
      </CenteredDiv>
    </FullWidthDiv>
  );
}

export default GPA;
