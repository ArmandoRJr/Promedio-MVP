import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@mui/material";
import Courses from './Courses';

export default function FormCourseDialog({handleClose, open, id}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{id ? 'Edit' : 'Add'} Course</DialogTitle>
        <DialogContent>
          <Courses handleClose={handleClose} id={id}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
