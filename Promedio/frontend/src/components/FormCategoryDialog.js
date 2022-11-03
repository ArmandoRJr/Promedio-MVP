import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@mui/material";
import Category from './EditCategoryForm';

export default function FormCategoryDialog({handleClose, open, id, course}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{id ? 'Edit' : 'Add'} Category</DialogTitle>
        <DialogContent>
          <Category handleClose={handleClose} id={id} course={course}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
