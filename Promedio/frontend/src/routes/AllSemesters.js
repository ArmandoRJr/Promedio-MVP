import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import { get, post } from '../api';

const FullWidthDiv = styled.div`
  width: 100%;
  ${'' /* height: 500px; */}
  height: 100vh;
  background-color: ${({theme}) => theme.colors.primary };
  color: ${({theme}) => theme.colors.white};
  padding: 0px;
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
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


function Welcome() {
  const navigate = useNavigate();
  const [semesters, setSemesters] = React.useState([]);
  const [formState, setFormState] = React.useState({
    name: '',
  });
  const [isEditing, setIsEditing] = React.useState(false);

  // on load make a get request to semesters
  React.useEffect(() => {
    get('semester').then((res) => {
      setSemesters(res.data);
    }, (err) => {
      console.log(err);
    });
  }, []);

  return (
    <FullWidthDiv>
      <CenteredDiv>
        <h1>Semesters</h1>
        <FlexRow>
          {semesters.map((semester) => (
            <SemesterCard key={semester._id} onClick={() => {
              navigate('/semesters/' + semester._id);
            }}>
              {semester.name}
            </SemesterCard>
          ))}
        </FlexRow>
        {isEditing ? (
          <FlexRow>
          <FormInput
            type="text"
            value={formState.name}
            onChange={(e) => setFormState({...formState, name: e.target.value})}
          />
          <SemesterButton onClick={() => {
              post(`semester`, {name: formState.name}).then((res) => {
                get('semester').then((res) => {
                  setSemesters(res.data);
                });
                setIsEditing(false);
              });
           }}>
            Save
           </SemesterButton>
          </FlexRow>
        ) : <SemesterButton onClick={() => { setIsEditing(true) }}>
            Add Semester
          </SemesterButton>}
      </CenteredDiv>
    </FullWidthDiv>
  );
}

export default Welcome;
