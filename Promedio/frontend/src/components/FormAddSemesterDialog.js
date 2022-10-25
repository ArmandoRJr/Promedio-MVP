import * as React from 'react';
import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle
} from "@mui/material";

export default function FormAddSemesterDialog(props) {

  const [semesterName, setSemesterName] = React.useState("");

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Semester</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new semester, please enter the semester name
            below and press ADD SEMESTER. Otherwise, please press CANCEL.
          </DialogContentText>
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
                // console.log(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={() => {
            props.handleAddSemester(semesterName);
            setSemesterName("");
          }}>Add Semester</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
