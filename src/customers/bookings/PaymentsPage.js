import * as React from 'react';
import { Button, Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Stack } from '@mui/system';
import { BookingContext } from '../../contexts/BookingContextProvider';

export default function PaymentsPage({handleProcessCompletion}) {  
  const { paymentInformation, postalCode, city, address } = React.useContext(BookingContext)


  function makePayment(){
    var options = {
      key:"rzp_test_c4w59vSC1YHIcl",
      key_secret:"9sRizYLMgqyKnzfueelu3kg4",
      amount:(paymentInformation.total*100),
      currency:"INR",
      name:"Service App",
      description:"",
      handler:function(response){
        console.log("Payment Response : ",response)
        handleProcessCompletion(true, response)
        //alert(response.razorpay_payment_id)
      },
      prefill:{
        name: paymentInformation.customer_name,
        email:paymentInformation.customer_email == null ? "info@serviceapp.com" : paymentInformation.customer_email,
        contact:paymentInformation.customer_mobile
      },
      notes:{
        address:(address+", "+city+", "+postalCode)
      },
      theme:{
        color:"#3399cc"
      }
    }
    
    var pay = new window.Razorpay(options);
    pay.open()

  }

  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
            <br/>
            <Table>
              <TableBody>
                
                {/* PHOTOGRAPHY */}
                { paymentInformation.items.PHOTOGRAPHY !== undefined &&
                  <>
                  <TableRow key={"photo"}><TableCell>Photography</TableCell> <TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                  {
                  paymentInformation.items.PHOTOGRAPHY.map(row=>(
                    <TableRow key={"ph_"+row}> 
                    <TableCell></TableCell>
                    { row.map(col=>( <TableCell>{col}</TableCell> )) } 
                    </TableRow>
                  ))
                  }
                  </>
                }
    
                {/* VIDEOGRAPHY */}
                { paymentInformation.items.VIDEOGRAPHY !== undefined &&
                  <>
                  <TableRow key={"video"}><TableCell>Videography</TableCell> <TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                  {
                  paymentInformation.items.VIDEOGRAPHY.map(row=>(
                    <TableRow key={"vd_"+row}> 
                    <TableCell></TableCell>
                    { row.map(col=>( <TableCell>{col}</TableCell> )) } 
                    </TableRow>
                  ))
                  }
                  </>
                }

                {/* DRONE */}
                { paymentInformation.items.DRONE !== undefined &&
                  <>
                  <TableRow key={"drone"}><TableCell>Drone</TableCell> <TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                  {
                  paymentInformation.items.DRONE.map(row=>(
                    <TableRow key={"dr_"+row}> 
                    <TableCell></TableCell>
                    { row.map(col=>( <TableCell>{col}</TableCell> )) } 
                    </TableRow>
                  ))
                  }
                  </>
                }

                
                {/* DRONE */}
                { (paymentInformation.items.PHOTOGRAPHY !== undefined || paymentInformation.items.VIDEOGRAPHY !== undefined || paymentInformation.items.DRONE !== undefined) &&
                  <>
                  <TableRow key={"drone"}><TableCell></TableCell> <TableCell></TableCell><TableCell>Total</TableCell><TableCell><b>{paymentInformation.total}</b></TableCell></TableRow>
                  </>
                }

                


              </TableBody>

            </Table>

            <br/>
            <br/>
            <Stack direction="row" justifyContent={"space-around"}>
              <span></span>
              <Button variant='outlined' onClick={makePayment}>Pay Rs.{paymentInformation.total}</Button>
              
            </Stack>
            
        </Grid>
    </Grid>
    );
  }
  