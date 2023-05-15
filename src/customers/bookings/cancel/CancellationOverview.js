import * as React from 'react';
import { Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import Typography from '@mui/material/Typography';

export default function CancellationOverview() {  
  
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
               <Typography style={{ textAlign: 'justify' }}>
                    Services that have not been confirmed by a photographer can be cancelled free of charge, but for the services that have been accepted by a photographer, a charge of Rs. 200/- will be incurred and the remaining balance (if any) will be transferred back to the source within seven days. 
                    <br/><br/>
                    <Table style={{ width: "100%", overflowX: "auto" }}>
                        <TableBody >
                            <TableRow> 
                                <TableCell>Photographer (Booking Approved)</TableCell>
                                <TableCell>Rs.200/-</TableCell>
                            </TableRow>
                            <TableRow> 
                                <TableCell>Photographer (Open)</TableCell>
                                <TableCell>Rs.0/-</TableCell>
                            </TableRow>
                            <TableRow> 
                                <TableCell>Videographer (Open)</TableCell>
                                <TableCell>Rs.0/-</TableCell>
                            </TableRow>
                            <TableRow> 
                                <TableCell><font color="red"><b>Total Cancellation Cost</b></font></TableCell>
                                <TableCell><font color="red"><b>Rs.200/-</b></font></TableCell>
                            </TableRow>
                            <TableRow> 
                                <TableCell><b>Refund Amount</b></TableCell>
                                <TableCell><b>Rs.1800/-</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Typography>
        </Grid>
    </Grid>
    )
  }
  