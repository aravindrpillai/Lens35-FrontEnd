import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import NewBookingModal from "./bookings/new/NewBookingModal";
import { get } from "../util/Service";
import { BOOKING_APIS } from "../util/Properties";
import { useEffect } from "react";
import { ButtonGroup, IconButton, Table, TableBody, TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VideocamIcon from '@mui/icons-material/Videocam';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import CustomerTheme from "./CustomerTheme";
import Content from "../Components/Content";
import { AppContext } from "../contexts/ContextProvider";
import { useContext } from "react";
import { BookingContextProvider } from "../contexts/BookingContextProvider";


const useStyles = makeStyles((theme) => ({
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));


export default function CustomerNewBooking() {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false)
  const [bookings, setBookings] = useState([])
  const { clearFlashMessage, setFlashMessage, setLoading } = useContext(AppContext)
  

  useEffect(e=>{
    async function fetchBookings(){
      setLoading(true)
      clearFlashMessage()
      var response = await get(BOOKING_APIS.LIST_MY_BOOKINGS)
      if(response["status"] === true){
        setBookings(response["data"])
      }else{
        console.log("Failed to fetch booking data", response["messages"])
        setFlashMessage("Failed to fetch booking data.")
      }
      setLoading(false)
    }
    fetchBookings()
  },[])


  return (
    <CustomerTheme>
    <Content>
      <BookingContextProvider booking_id={null}>
        <NewBookingModal thisModalHandler={openModal} setThisModalHandler={setOpenModal} />
      </BookingContextProvider>
      <Paper elevation={2} className={classes.summaryCard}>
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"} >
          <Typography color={"primary"} variant="h5" gutterBottom>Bookings</Typography>
          <Button variant="outlined" onClick={(e) => {setOpenModal(true)}}>Add New Booking</Button>
        </Stack>
        <Table size="small">
          <TableBody>
          {  
          bookings.map(booking=>(
            <TableRow key={booking.booking_id}>
              <TableCell>
                <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                  <Typography >{booking.event} <br/><font size="2">{booking.event_date} : {booking.event_start_time}</font></Typography>
                  <IconButton disabled={true}><FlipCameraAndroidIcon/><VideocamIcon /><CameraAltIcon/></IconButton>
                  <ButtonGroup>
                    <IconButton><EditIcon/></IconButton>
                    <IconButton><DeleteIcon/></IconButton>
                  </ButtonGroup>
                </Stack>
              </TableCell>
            </TableRow>
            ))
          } 
          </TableBody>
        </Table>
      </Paper>
   </Content>
   </CustomerTheme>
  );
}


