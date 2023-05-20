import * as React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { BOOKING_APIS } from '../../../util/Properties';
import { get } from '../../../util/Service';

export default function CancellationConfirmation({booking_id}) {  
  const[message, setMessage] = React.useState(null)
  
  useEffect(e=>{
    async function cancelBooking(){
      setMessage("Cancelling, Please wait..!")
      var response = await get(BOOKING_APIS.CANCEL_BOOKING.concat(booking_id+"/"))
      console.log(response)
      if(response["status"] === true){
          setMessage("Your booking has been cancelled!")
      }else{
        console.log("Failed to fetch booking cancellation data", response["messages"])
        setMessage(response["messages"])
      }
    }
    cancelBooking()
  },[booking_id])

  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
            <br/>
              <Typography style={{ textAlign: 'justify' }}>{message}</Typography>
            <br/>
        </Grid>
    </Grid>
    )
  }
  