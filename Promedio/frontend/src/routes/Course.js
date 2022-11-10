import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components'
import { post, get } from '../api';
import Courses from '../components/EditCourseForm';
import Category from '../components/EditCategoryForm';
import AddCategoryModal from '../components/FormCategoryDialog';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const FullWidthDiv = styled.div`
  width: 100%;
  ${'' /* height: 500px; */}
  height: 100vh;
  background-color: ${({theme}) => theme.colors.white };
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
  width: 100%;
  border-radius: 20px;
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
  flex-direction: row;
  justify-content: space-between;
  p {
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
  margin-bottom: 20px;
`;

const CourseCard = styled.div`
  h1 {
    color: white;
  }
  background-color: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.primary_light};
  padding: 50px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
`;

const CategoryButton = styled.button`
    background-color: ${({theme}) => theme.colors.primary};
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
    border-radius: 20px;
`;

const SheetContainer = styled.div`
  width: 90%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.white };
  color: ${({theme}) => theme.colors.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
`;

const CategoryContainer = styled.div`
    width: 50%;
    height: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin: 50px;
`;

const ButtonsContainer = styled(ButtonContainer)`
    margin: 30px 0 30px 30px;
    display: flex;
    justify-content: flex-end;
    #delete {
      transition: 0.3s ease;
      &:hover {
        background-color: red;
      }
    }
`;


function CourseDetails() {
  const navigate = useNavigate();
  // get id from react router
  const { id: semesterId, courseId } = useParams();
  const [course, setCourse] = React.useState(undefined);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isAddCatModalOpen, setIsAddCatModalOpen] = React.useState(false);
  const [isEditCatModalOpen, setIsEditCatModalOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [calculations, setCalculations] = React.useState({
    courseCompletion: 0,
    currentMark: 0,
    markGoal: 0,
    remainingMark: 0,
    summedMarks: 0
  });

  // on load make a get request to courses
  React.useEffect(() => {
    if (!semesterId) {
      navigate('/semesters');
      return;
    }
    if (!courseId) {
      navigate(`/semesters/${semesterId}`);
      return;
    }
    getCourse();
    getCategories();
  }, []);

  const getCourse = () => {
    get(`course/${courseId}`).then((res) => {
      setCourse(res.data);
    });
  };

  const getCategories = () => {
    get(`categories/${courseId}`).then(
      (res) => {
        setCategories(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const getCalculations = () => {
    get(`calculation?courseIds[]=${courseId}`).then(
      (res) => {
        setCalculations(res.data[0]);
        console.log(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function handleDelete(id) {
    post(`deleteCategory`, { id: id }).then(
      (res) => {
        getCategories();
      },
      (error) => {
        console.log(error);
      });
  }

  const columnDefs = [
    {field: 'Assessment'},
    {field: 'Weight %', editable: true},
    {field: 'Grade %', editable: true},
  ]
  

  function getRows(id) {
    let rowData = [];
    for (let i = 0; i < categories.length; i++) {
      if (categories[i]._id == id) {
        for (let j = 0; j < categories[i].numAssessments; j++) {
            let row = {};
            row['Assessment'] = categories[i].name + " " + (j + 1);
            categories[i].weights[j] != -1 ? row['Weight %'] = categories[i].weights[j] : row['Weight %'] = "";
            categories[i].grades[j] != -1 ? row['Grade %'] = categories[i].grades[j] : row['Grade %'] = "";
            rowData.push(row);
        }
      }
    }
    return rowData;
  }

  const cellChangedListener = useCallback((event, key) => {
    let newValue = -1;
    let index = event.node.rowIndex;
    if (event.value != "") newValue = parseInt(event.value);
    
    let categoryToChange = categories.find(category => category._id == key)
    if (event.column.colId === "Weight %") {
      categoryToChange = {
        ...categoryToChange,
        weights: categoryToChange.weights.slice(0, index).concat(
          newValue, categoryToChange.weights.slice(index+1)
        )
      }
    } else if (event.column.colId === "Grade %") {
      categoryToChange = {
        ...categoryToChange,
        grades: categoryToChange.grades.slice(0, index).concat(
          newValue, categoryToChange.grades.slice(index+1)
        )
      }
    }

    post(`editCategory/`, {
      ...categoryToChange, id: categoryToChange._id
    }).then((response) => {
      setCategories(categories.map(category => {
        if (category._id === categoryToChange._id) return categoryToChange;
        else return category;
      }))
    });
  });


  return (
    <FullWidthDiv>
      <CenteredDiv>
        <BackButton onClick={() => navigate(`/semesters/${semesterId}`)}>Back</BackButton>
        {isEditing ? (
          <Courses
            id={courseId}
            semester={semesterId}
            open={isEditing}
            course={course}
            handleClose={() => {
              setIsEditing(false);
              getCourse();
            }}
          />
        ) : (
        course ? 
        (
          <FullWidthDiv>
            <CourseCard>
              <h1>{course.name}</h1>
              <InfoContainer>
                <p>Description: <b>{course.description}</b></p>
                <p>Mark Goal: <b>{course.markGoal.toFixed(2)}</b>%</p>
                <p>Average Needed: <b>{calculations.remainingMark.toFixed(2)}</b>%</p>
              </InfoContainer>
              <InfoContainer>
                <p>Current Mark: <b>{calculations.currentMark.toFixed(2)}</b>%, GPA: <b>N/A</b></p>
                <p>Course Completion: <b>{calculations.courseCompletion.toFixed(2)}% out of {calculations.summedMarks.toFixed(2)}%</b></p>
              </InfoContainer>
              <CourseButton onClick={() => { setIsEditing(true) }}>Edit Course</CourseButton>
            </CourseCard>
            <ButtonContainer>
              <CategoryButton onClick={() => setIsAddCatModalOpen(true)}>Add Category + </CategoryButton>
            </ButtonContainer>
            <SheetContainer>
                {categories.map((category) => (
                  <CategoryContainer key={category._id} className='ag-theme-alpine'>
                    <h1>{category.name + " (s)"}</h1>
                    <AgGridReact 
                      onCellValueChanged={(e) => { cellChangedListener(e, category._id) } } 
                      rowData={getRows(category._id)}
                      columnDefs={columnDefs}
                      domLayout='autoHeight'
                    />
                    <ButtonsContainer>
                      <CategoryButton onClick={() => setIsEditCatModalOpen(true)}>Edit</CategoryButton>
                      <CategoryButton id="delete" onClick={() => handleDelete(category._id)}>Delete</CategoryButton>
                    </ButtonsContainer>
                    <AddCategoryModal
                      handleClose={() => {
                        setIsEditCatModalOpen(false);
                        getCategories();
                      }}
                      open={isEditCatModalOpen}
                      course={courseId}
                      id={category._id}
                    />
                  </CategoryContainer>
                ))}
            </SheetContainer>
            <AddCategoryModal
              handleClose={() => {
                setIsAddCatModalOpen(false);
                getCategories();
              }}
              open={isAddCatModalOpen}
              course={courseId}
              id={undefined} 
            />
          </FullWidthDiv>
        ) : (
          <h3>Course not found.</h3>
        )
        )}
      </CenteredDiv>
    </FullWidthDiv>
  );
}

export default CourseDetails;
