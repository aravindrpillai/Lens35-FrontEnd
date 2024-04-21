import * as React from 'react';
import { Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { BookingContext } from '../../../contexts/BookingContextProvider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function EventPayment() {  
  const { invoice } = React.useContext(BookingContext)
  const [openAccordian, setOpenAccordian] = React.useState(null);

  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
            <br/>
            
                { 
                  invoice["services"] && invoice["services"].filter(_row=>_row["service_cost"] > 0).map(service=>(
                    <Accordion key={service["service_id"]} expanded={openAccordian === service["service_id"]} onChange={()=>{setOpenAccordian(openAccordian === service["service_id"] ? null : service["service_id"])}}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography sx={{ width: '70%', flexShrink: 0 }}>{service["service_name"]} {service["retired"] ? <font color="red" size="2">(Cancelled)</font> : ""}</Typography>
                        <Typography >Rs.{service["service_cost"]}/-</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Table style={{ width: "100%", overflowX: "auto" }} key={service["service_id"]}>
                          <TableBody >
                          {
                            service["invoice_items"] && service["invoice_items"].map(item=>(
                            <TableRow key={item["invoice_item_id"]}> 
                              <TableCell>{item["description"]}</TableCell>
                              <TableCell>Rs.{item["total_cost"]}/-</TableCell>
                            </TableRow>
                            ))
                          }
                          </TableBody>
                        </Table>          
                      </AccordionDetails>
                    </Accordion>
                  ))
                }
            
        </Grid>
    </Grid>
    )
  }
  