import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CancellationOverview from './CancellationOverview';
import CancellationConfirmation from './CancellationConfirmation';
import { get } from '../../../util/Service';
import { CUSTOMER_APIS } from '../../../util/Properties';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}))


function BootstrapDialogTitle({ children, onClose, ...other }) {
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

export default function BookingCancellModal({bookingid, thisModalHandler, setThisModalHandler}) {
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState(null)
  const [cancellationInfo, setCancellationInfo] = useState(null)
  
  async function handlePagination(isForward){
    var newPageValue = (isForward ? page+1 : page-1)
    newPageValue = newPageValue < 1 ? 1 : (newPageValue > 2) ? 2 : newPageValue
    setPage(newPageValue)
  }
  

  React.useEffect(e=>{
      async function fetchBookingCancellationCost(){
        setPage(1)  
        var response = await get(CUSTOMER_APIS.CALCULATE_CANCELLATION_COST.concat(bookingid+"/"))
        if(response["status"] === true){
            setCancellationInfo(response["data"])
            setMessage(null)
        }else{
          console.log("Failed to fetch booking cancellation data", response["messages"])
          setMessage(response["messages"])
        }
      }
      fetchBookingCancellationCost()
  },[bookingid])

  return (
      <React.Fragment>
        <BootstrapDialog open={thisModalHandler} >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {setThisModalHandler(false) }}> 
              {page === 1 && <>Cancellation</>}
              {page === 2 && <>Confirmation</>}
          </BootstrapDialogTitle>
          
          <DialogContent dividers>
            {page === 1 && <CancellationOverview cancellationInfo={cancellationInfo} message={message} />}
            {page === 2 && <CancellationConfirmation booking_id={bookingid}/>}
          </DialogContent>
        
        {message === null &&
          <DialogActions style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Button disabled={page!==1} variant="contained" color="primary" onClick={()=>handlePagination(false)} autoFocus> {page===1 ? "Cancell" : "Back"} </Button>
              <Button variant="contained" color="primary" onClick={()=>handlePagination(true)} autoFocus >  {page===1 ? "Confirm and Cancell" : "Close"} </Button>
          </DialogActions>
        }
        </BootstrapDialog>
      </React.Fragment>
  )
}
