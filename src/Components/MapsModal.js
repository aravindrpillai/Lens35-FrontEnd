import * as React from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

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

export default function MapsModal({open, openHandler}) {
  
  var encodedLoc = encodeURIComponent("anchal, Kollam, district")
  //const mapUrl = "https://www.google.com/maps/embed/v1/place?q="+encodedLoc+"&key=YOUR_API_KEY";
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193493.50486319545!2d-122.41941588144329!3d37.77492952296388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580800849413d%3A0xa92c2a4baf199fa!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sca!4v1621837757875!5m2!1sen!2sca"
  
  return (
      <BootstrapDialog onClose={() => {openHandler(false) }} open={open} >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {openHandler(false) }}> Maps </BootstrapDialogTitle>
        <DialogContent dividers>
        <iframe
          width="500"
          height="350"
          style={{ border: 0 }}
          src={mapUrl}
          allowFullScreen
        ></iframe>
        </DialogContent>
        <DialogActions>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button onClick={()=>{openHandler(false)}} autoFocus >Close</Button>
            </Stack>
        </DialogActions>
      </BootstrapDialog>
  )
}
