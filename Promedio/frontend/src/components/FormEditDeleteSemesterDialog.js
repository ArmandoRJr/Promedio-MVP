import * as React from 'react';
import { 
    Button, 
    TextField, 
    FormControl,
    InputLabel, 
    Select,
    MenuItem,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle,
} from "@mui/material";

export default function FormAddSemesterDialog(props) {

  const [semesterName, setSemesterName] = React.useState();

  const [semesterSelection, setSemesterSelection] = React.useState();
  const [semesterSelectionName, setSemesterSelectionName] = React.useState();

  const handleSemesterChange = (event) => {
    console.log(props.semesterData);
    setSemesterSelectionName(event.target.value);
    setSemesterSelection(props.semesterData.find(semester => semester.name == event.target.value));
    setSemesterName(event.target.value);
  };

  const handleClose = () => {
    setSemesterName();
    setSemesterSelection();
    setSemesterSelectionName();
    props.handleClose();
  }

  const blankStates = () => {
    setSemesterName();
    setSemesterSelection();
    setSemesterSelectionName();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Edit/Delete Semester</DialogTitle>
        <DialogContent>
          <div>
            <DialogContentText sx={{paddingBottom: 2}}>
              To edit or delete a semester, please select an existing
              semester from the dropdown, then either make any changes and
              press Edit with new changes, or press Delete to delete the semester.
            </DialogContentText>
          </div>
          
          
          <FormControl fullWidth>
          <InputLabel>Semester</InputLabel>
            <Select
              id="selectSem"
              value={semesterSelectionName}
              label="Semester"
              onChange={handleSemesterChange}
            >
              {props.semesterData.map(semester => (
                
                <MenuItem
                  key={semester.name}
                  value={semester.name}
                >
                  {semester.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>


          <TextField
            autoFocus
            margin="dense"
            id="addSemesterNameInput"
            name="semesterName"
            label="Semester Name"
            type="text"
            required
            fullWidth
            variant="standard"
            value={semesterName}
            onChange={e => {
                setSemesterName(e.target.value);
            }}
            sx={semesterSelectionName ? {display: {xs: 'block'}} : {display: {xs: 'none'}}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            props.handleEditSemester(semesterSelection._id, semesterName);
            blankStates();
          }}
            sx={semesterSelectionName ? {display: {xs: 'block'}} : {display: {xs: 'none'}}}
          >Edit Semester</Button>
          <Button onClick={() => {
            props.handleDeleteSemester(semesterSelection._id);
            blankStates();
          }}
            sx={semesterSelectionName ? {display: {xs: 'block'}} : {display: {xs: 'none'}}}
          >Delete Semester</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
