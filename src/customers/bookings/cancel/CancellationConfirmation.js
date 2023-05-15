import * as React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@mui/material/Typography';

export default function CancellationConfirmation() {  
  
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
            <br/>
               <Typography>
                    Your booking has been cancelled! 
                </Typography>
            <br/>
        </Grid>
    </Grid>
    )
  }
  