import * as React from 'react';
import { Grid } from '@material-ui/core';
import { Slider, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BookingContext } from '../../contexts/BookingContextProvider';
import { getDefaultBookingStartDate, getDifferenceInMinutes } from '../../util/DateUtil';

export default function BookingDateAndTime() {  

   const { 
    bookingStartDateAndTime, setBookingStartDateAndTime,
    bookingDuration, setBookingDuration,
    eventDescription, setEventDescription,
    setMessage
   } = React.useContext(BookingContext)
  
  return (
    <Grid container spacing={2} >
        
        <Grid item xs={12} md={12} lg={12}>
            <br/> 
            <TextField
                variant="outlined" margin="normal" required autoFocus fullWidth
                label="Booking From"
                type="datetime-local"
                onInput={e=>{
                  let diffInMins = getDifferenceInMinutes(e.target.value)
                  if(diffInMins < 115){
                    setMessage("Booking Date/Time changed - (Minimum 2Hr difference must be there)")
                    e.target.value = getDefaultBookingStartDate()
                  }else{
                    setMessage(null)
                  }
                }}
                onChange={e=>{ setBookingStartDateAndTime(e.target.value) }}
                value={bookingStartDateAndTime}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{m:4}}>
        <br/>
          <Typography>How long do you need the booking for?</Typography>
          <center>
          
          <br/>
            <Box sx={{ width: "90%" }} > 
              <Slider aria-label="Temperature"
                value={bookingDuration}
                onChange={e=>{setBookingDuration(e.target.value)}}
                getAriaValueText={(e,value)=>{return value+" Hours"}}
                valueLabelDisplay="off"
                step={1}
                marks = {[
                  {value: 2,label: '2 Hours'}, 
                  {value: 3,label: '3 Hours'}, 
                  {value: 4,label: '4 Hours'}, 
                  {value: 5,label: '5 Hours'},
                  {value: 6,label: '6 Hours'},
                  {value: 7,label: '7 Hours'},
                  {value: 8,label: '8 Hours'},
                ]}
                min={2}
                max={8}
              />
            </Box>
          </center>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
            <br/> 
            <TextField
              fullWidth 
              label="Describe the event"
              value={eventDescription??""}
              onChange={e=>{setEventDescription(e.target.value)}}
            />
        </Grid>

    </Grid>
    );
  }
  