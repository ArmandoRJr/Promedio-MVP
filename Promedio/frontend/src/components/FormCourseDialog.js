import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@mui/material";
import Courses from './EditCourseForm';

export default function FormCourseDialog({handleClose, open, id, semester}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{id ? 'Edit' : 'Add'} Course</DialogTitle>
        <DialogContent>
          <Courses handleClose={handleClose} id={id} semester={semester}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
