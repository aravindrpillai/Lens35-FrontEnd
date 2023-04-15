import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddQualificationModal({render}) {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      {render(handleClickOpen)}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title"> Add Qualification</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Qualification Name"
            fullWidth
            error={true}
            helperText="Incorrect entry."
          />
          <TextField
            autoFocus
            margin="dense"
            label="Completion Year"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Completion Year"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary"> Cancel </Button>
          <Button color="primary"> Save </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
