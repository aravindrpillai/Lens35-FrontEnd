import * as React from 'react';
import { Button, Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Stack } from '@mui/system';
import { BookingContext } from '../../../contexts/BookingContextProvider';

export default function EventPayment({handleProcessCompletion}) {  
  const { invoice , postalCode, city, address } = React.useContext(BookingContext)

  function makePayment(){
    var options = {
      key:"rzp_test_c4w59vSC1YHIcl",
      key_secret:"9sRizYLMgqyKnzfueelu3kg4",
      amount:(invoice.outstanding_amount*100),
      currency:"INR",
      name:"Service App",
      description:"",
      handler:function(response){
        console.log("Payment Response : ",response)
        handleProcessCompletion(true, response)
        //alert(response.razorpay_payment_id)
      },
      prefill:{
        name: "Deepu Chandran",
        email: "info@serviceapp.com",
        contact: "9447020535"
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
            <Table style={{ width: "100%", overflowX: "auto" }}>
              <TableBody >
                { 
                  invoice["invoice_items"] && invoice["invoice_items"].map(row=>(
                    <TableRow key={"ph_"+row["service"]}> 
                      <TableCell>{row["service"]}</TableCell>
                      <TableCell>Rs.{row["total_cost"]}/-</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
            <br/>
            <br/>
            <Stack direction="row" justifyContent={"space-around"}>
              <span></span>
              <Button variant='outlined' onClick={makePayment}>Pay Rs.{invoice.outstanding_amount}</Button>
              
            </Stack>
            
        </Grid>
    </Grid>
    )
  }
  