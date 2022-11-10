import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components'
import { get } from '../api';
import CourseModal from '../components/FormCourseDialog';

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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SemesterCard = styled.div`
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

function SemesterDetails() {
  const navigate = useNavigate();
  // get id from react router
  const { id } = useParams();
  const [courses, setCourses] = React.useState([]);
  const [gpa, setGpa] = React.useState('N/A');
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = React.useState(false);

  // on load make a get request to courses
  React.useEffect(() => {
    if (!id) {
      navigate('/courses');
    }
    getCourses();
  }, []);

  const getCourses = () => {

    get('course').then((res) => {
      setCourses(res.data);
    });

    get(`calculations`).then((res) => {
      if (res.data.cGPA) {
        setGpa(res.data.cGPA);
      }
    }).catch((err) => {
      setGpa('N/A');
    });
  };

  return (
    <FullWidthDiv>
      <CourseModal
        handleClose={() => {
          setIsAddCourseModalOpen(false);
          // This isn't the best practice but it works to refresh the courses list
          getCourses();
        }}
        open={isAddCourseModalOpen}
        semester={id}
        id={undefined}
      />
      <CenteredDiv>
        <h1>All Courses</h1>
        <h2>cGPA: {gpa}</h2>
        <FlexRow>
          {courses.map((course) => (
            <SemesterCard key={course._id} onClick={() => {
              navigate(`/semesters/${course.semesterId}/courses/${course._id}`);
            }}>
              {course.name}
            </SemesterCard>
          ))}
          <SemesterButton onClick={() => {
            setIsAddCourseModalOpen(true);
          }}>
            Add Course
          </SemesterButton>
        </FlexRow>
      </CenteredDiv>
    </FullWidthDiv>
  );
}

export default SemesterDetails;
