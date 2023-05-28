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
import { EMPLOYEE_APIS } from '../../util/Properties';
import { AppContext } from '../../contexts/ContextProvider';
import { get } from '../../util/Service';

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

export default function SubmitAndLock({open, openHandler, service_id, callBackHandler}) {
  const { clearFlashMessage, setFlashMessage, setLoading } = React.useContext(AppContext)
  
  async function lock(){
    clearFlashMessage()
    setLoading(true)
    let response = await get(EMPLOYEE_APIS.LOCK_AND_SUBMIT_SERVICE+service_id+"/")
    if(response["status"] === true){
        setFlashMessage("success","Service is locked. We will inform the customer about the update post processing the files.")
        callBackHandler(true)
    }else{
        setFlashMessage("error",response["messages"][0])
        callBackHandler(false)
    }
    setLoading(false)
    openHandler(false)
  }


  return (
      <BootstrapDialog onClose={() => {openHandler(false) }} open={open} >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {openHandler(false) }}> Confirm Action</BootstrapDialogTitle>
        <DialogContent dividers>
            <Typography variant='h6' sx={{"display": "flex"}}>
              Once you submit and lock, the photos/videos will be available to the customer. 
              This service will be marked as complete and NO more updates can be done on top of this service. 
              <br/>Confirm your action. </Typography>
        </DialogContent>
        <DialogActions>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button autoFocus onClick={()=>{openHandler(false)}}>Cancel</Button>
                <Button autoFocus onClick={lock}>Submit and Lock</Button>
            </Stack>
        </DialogActions>
      </BootstrapDialog>
  )
}
