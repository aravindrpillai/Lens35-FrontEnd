import * as React from 'react';
import { Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import Typography from '@mui/material/Typography';

export default function CancellationOverview({ cancellationInfo,  message}) {  
    
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
                    
                    {cancellationInfo !== null &&
                    <React.Fragment>
                        <Typography style={{ textAlign: 'justify' }}>
                            Services that have not been confirmed by a photographer can be cancelled free of charge, but for the services that have been accepted by a photographer, a charge of Rs. 200/- will be incurred and the remaining balance (if any) will be transferred back to the source within seven days. 
                        </Typography>
                        <br/><br/>
                        <Table style={{ width: "100%", overflowX: "auto" }}>
                            <TableBody >
                                {cancellationInfo["services"] && cancellationInfo["services"].map(service =>(
                                    <TableRow key={service["service_id"]}> 
                                        <TableCell>{service["service_name"]}  {service["employee"] === null ? "" : "("+service["employee"]+")"}</TableCell>
                                        <TableCell>{service["cancellation_cost"]}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow> 
                                    <TableCell><font color="red"><b>Total Cancellation Cost</b></font></TableCell>
                                    <TableCell><font color="red"><b>Rs.{cancellationInfo["total_cancellation_amount"]}/-</b></font></TableCell>
                                </TableRow>
                                <TableRow> 
                                    <TableCell><b>Refund Amount</b></TableCell>
                                    <TableCell><b>Rs.{cancellationInfo["refund_amount"]}/-</b></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </React.Fragment>
                    }

                    {message !== null &&
                        <Typography style={{ textAlign: 'justify' }}>{message}</Typography>
                    }
                
                
                
        </Grid>
    </Grid>
    )
  }
  