import React, { useContext, useState } from "react";
import Content from "../../Components/Content";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { CUSTOMER_APIS } from "../../util/Properties";
import { post } from "../../util/Service";
import { getThisMonthAndYear } from "../../util/DateUtil";
import { Stack } from "@mui/material";
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { AppContext } from "../../contexts/ContextProvider";
import CustomerTheme from "../CustomerTheme";
import NewBookingModal from "./new/NewBookingModal";
import { BookingContextProvider } from "../../contexts/BookingContextProvider";
import EachBookingTile from "./show/EachBookingTile";
import BookingCancellModal from "./cancel/BookingCancellModal";

export default function CustomerBookings() {
  const { clearFlashMessage, setFlashMessage, setLoading } = useContext(AppContext)
  const [bookingData, setBookingData] = useState([])
  const [selectedBokingID, setSelectedBookingID] = useState(null)
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false)
  const [eventDate, setEventDate] = useState(getThisMonthAndYear())
  
  const [selectedBokingIDForCancellation, setSelectedBookingIDForCancellation] = useState(null)
  const [cancellBookingModalOpen, setCancellBookingModalOpen] = useState(false)
  

  useEffect(e=>{
    async function fetchBookings(){
      setLoading(true)
      clearFlashMessage()
      var response = await post(CUSTOMER_APIS.LIST_CUSTOMER_BOOKINGS, { "event_date" : eventDate })
      console.log(response)
      if(response["status"] === true){
        setBookingData(response["data"])
      }else{
        console.log("Failed to fetch booking data", response["messages"])
        setFlashMessage("error","Failed to fetch booking data.")
      }
      setLoading(false)
    }
    fetchBookings()
  },[eventDate])

  function openBooking(bookingID){
    setSelectedBookingID(bookingID)
    setNewBookingModalOpen(true)
  }

  function setCancellBookingModalOpenHandler(bookingID){
    setSelectedBookingIDForCancellation(bookingID)
    setCancellBookingModalOpen(true)
  }

  return (
    <CustomerTheme>
      <Content>
          <BookingContextProvider  booking_id={selectedBokingID}>
            <NewBookingModal thisModalHandler={newBookingModalOpen} setThisModalHandler={setNewBookingModalOpen}/>
          </BookingContextProvider>
          <BookingCancellModal bookingid={selectedBokingIDForCancellation} thisModalHandler={cancellBookingModalOpen} setThisModalHandler={setCancellBookingModalOpen}/>

          <Grid container spacing={1}>

            <Grid item xs={12} md={12} lg={12}><SearchBar /></Grid>
            
            {
              bookingData.map(booking=>(
                <Grid item xs={12} md={6} lg={3} key={booking.booking_id}>
                  <EachBookingTile booking={booking} openBooking={openBooking} cancellBookingHandler={setCancellBookingModalOpenHandler}/>
                </Grid>
              ))
            }
            {
              bookingData.length < 1 && 
              <Grid item xs={12} md={12} lg={12}>
                <br/><br/>
                <Typography variant="h5">UUh..!! You dont have any bookings on {eventDate.split("T")[0]}.</Typography>
              </Grid>
            }
          </Grid>
    </Content>
   </CustomerTheme>
  )

  function SearchBar() {
    return (
        <Paper>
          <Stack justifyContent={"space-between"} direction={"row"}>
            <Stack justifyContent={"space-between"} direction={"row"}>
                <TextField variant="outlined"
                  label="Event Month"
                  type="month"
                  onChange={(e) => { setEventDate(e.target.value) }}
                  value={eventDate}
                  InputLabelProps={{ shrink: true }}
                />
            </Stack>
            <Button variant="outlined" onClick={()=>{setSelectedBookingID(null); setNewBookingModalOpen(true)}}><CameraEnhanceIcon color="primary"/></Button>
  
          </Stack>
        </Paper>
    );
  }
  
}
