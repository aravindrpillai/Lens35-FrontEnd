import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}))


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }} >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function ConfirmationModal({open, openHandler, confirmHandler, title, content}) {
  return (
      <BootstrapDialog onClose={() => {openHandler(false) }} open={open} >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {openHandler(false) }}> {title} </BootstrapDialogTitle>
        <DialogContent dividers>
            <Typography variant='h6' sx={{"display": "flex"}}>
              {content} 
            </Typography>
        </DialogContent>
        <DialogActions>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button onClick={()=>{openHandler(false)}} autoFocus >Cancel</Button>
                <Button onClick={confirmHandler} autoFocus >Confirm</Button>
            </Stack>
        </DialogActions>
      </BootstrapDialog>
  )
}
