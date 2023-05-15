import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { BookingContext } from '../../../contexts/BookingContextProvider';
import SelectEvent from './SelectEvent';
import { useState } from 'react';
import EventDateAndTime from './EventDateAndTime';
import EventLocation from './EventLocation';
import SelectServices from './SelectServices';
import EmployeePreference from './EmployeePreference';
import EventPayment from './EventPayment';

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

export default function NewBookingModal({thisModalHandler, setThisModalHandler}) {
  const [page, setPage] = useState(1)
  const [showPaymentPage, setShowPaymentPage] = useState(true)
  const { validate, message, saveData, loading } = React.useContext(BookingContext)

  async function handlePagination(isForward){
    if(! await validate(page)){ return }
    setShowPaymentPage(true)
    var newPageValue = (isForward ? page+1 : page-1)
    if(page === 4 && isForward){
      newPageValue = 6
    }else if(page === 6 && !isForward){
      newPageValue = 4
    }
    newPageValue = newPageValue < 1 ? 1 : (newPageValue > 6) ? 6 : newPageValue
    
    if(newPageValue === 6){
      setShowPaymentPage(false)
      if(await saveData()){
        setShowPaymentPage(true)
        setPage(newPageValue)
      }
    }else{
      setPage(newPageValue)
    }
    
  }

  return (
      <React.Fragment>
        <BootstrapDialog open={thisModalHandler} >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {setThisModalHandler(false) }}> 
              {page === 1 && <>Tell us about your event</>}
              {page === 2 && <>When do you need the booking?</>}
              {page === 3 && <>Tell us where to come!</>}
              {page === 4 && <>Specify the services you are looking for</>}
              {page === 5 && <>Select your favourite photographer</>}
              {page === 6 && <>Lets settle it up.</>}
          </BootstrapDialogTitle>
          
          <DialogContent dividers>
            {page === 1 && <SelectEvent />}
            {page === 2 && <EventDateAndTime/>}
            {page === 3 && <EventLocation />}
            {page === 4 && <SelectServices />}
            {page === 5 && <EmployeePreference />}
            {page === 6 && <EventPayment />}
          </DialogContent>

          <DialogActions style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Button disabled={page<=1} variant="contained" color="primary" onClick={()=>handlePagination(false)} autoFocus> Back </Button>
              <center>{message && <font color="red">{message}</font>}</center>
              <Button disabled={page>=6 || !showPaymentPage} variant="contained" color="primary" onClick={()=>handlePagination(true)} autoFocus > Next </Button>
          </DialogActions>

        </BootstrapDialog>
      </React.Fragment>
  )
}
