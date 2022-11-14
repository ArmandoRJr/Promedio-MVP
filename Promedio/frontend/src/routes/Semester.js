import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components'
import { del, get, patch } from '../api';
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

// small red button to delete a course
const DeleteButton = styled.button`
  background-color: ${({theme}) => theme.colors.red};
  color: ${({theme}) => theme.colors.white};
  cursor: pointer;
  padding: 5px 10px;
  margin: 20px;
  border: none;
  border-radius: 3px;
  &:hover {
    opacity: 0.8;
  }
  font-size: 1.2rem;
  font-weight: bold;
`;

function SemesterDetails() {
  const navigate = useNavigate();
  // get id from react router
  const { id } = useParams();
  const [semester, setSemester] = React.useState(undefined);
  const [formState, setFormState] = React.useState({
    name: '',
  });
  const [courses, setCourses] = React.useState([]);
  const [gpa, setGpa] = React.useState('N/A');
  const [isEditing, setIsEditing] = React.useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (semester?.name) {
      setFormState({
        name: semester?.name,
      });
    }
  }, [semester]);

  // on load make a get request to courses
  React.useEffect(() => {
    if (!id) {
      navigate('/courses');
    }
    get(`semester/${id}`).then((res) => {
      setSemester(res.data);
    });
    getCourses();
    
  }, []);

  const getCourses = () => {

    get('course').then((res) => {
      const coursesToAdd = res.data.filter((course) => course.semesterId === id)
      setCourses(coursesToAdd);
      const courseIds = coursesToAdd.map((course) => course._id);

      if (res.data.length === 0) {setGpa(`N/A`)}
      else {
        const queryArray = courseIds.map(courseId => { return `courseIds[]=${courseId}` }).join("&")
        get(`calculations?${queryArray}`).then((res) => {
          setGpa(res.data.GPA);
        }).catch((err) => {
          setGpa('N/A')
        });
      }
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
        <BackButton onClick={() => navigate('/semesters')}>Back</BackButton>
        <h1>{semester?.name}</h1>
        <h2>sGPA: {gpa}</h2>
        {isEditing ? (
          <FlexRow>
          <FormInput
            type="text"
            value={formState.name}
            onChange={(e) => setFormState({...formState, name: e.target.value})}
          />
          <SemesterButton onClick={() => {
            if (formState.name !== semester.name) {
              patch(`semester/${id}`, {name: formState.name}).then((res) => {
                setSemester({
                  ...semester,
                  name: formState.name,
                });
                setIsEditing(false);
              });
            } else {
              setIsEditing(false);
            }
           }}>
            Save
           </SemesterButton>
          </FlexRow>
        ) : <SemesterButton onClick={() => { setIsEditing(true) }}>
            Edit Semester
          </SemesterButton>}
        <h2>Courses for {semester?.name}</h2>
        <FlexRow>
          {courses.map((course) => (
            <SemesterCard key={course._id} onClick={() => {
              navigate(`/semesters/${id}/courses/${course._id}`);
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
        <DeleteButton onClick={() => {
          del(`semester/${id}`).then((res) => {
            navigate('/semesters');
          }
          );
        }}>
          Delete Semester
          </DeleteButton>
      </CenteredDiv>
    </FullWidthDiv>
  );
}

export default SemesterDetails;
