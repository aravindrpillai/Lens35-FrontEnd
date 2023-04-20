import React, { useContext, useEffect } from "react";
import Content from "../Components/Content";
import SummaryCard from "../Components/SummaryCard";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import CustomerTheme from "./CustomerTheme";
import { AppContext } from "../contexts/ContextProvider";


function BookingButton(){
  return (
    <Button variant="contained" color="primary" onClick={onClickEvent} style={{float: 'right'}}>Hello</Button>
  )
}

function onClickEvent(){
  console.log("clicked...!!!!")
}


export default function CustomerHome() {

  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
  const [openEditModal, setOpenEditModal] = React.useState(false)
  const [openViewModal, setOpenViewModal] = React.useState(false)
  const [selectedBookingID, setSelectedBookingID] = React.useState(null)
  const [bookings, setBookings] = React.useState([])

  function openBookingModal(booking_id){
    console.log("BOOKING -- ID --FOR -- MODAL ---> ", booking_id)
    booking_id = (booking_id === null || booking_id === "" || booking_id === undefined) ? null : booking_id
    setSelectedBookingID(booking_id)
    setOpenEditModal(true)
  }

  useEffect(e=>{
    
  },[])



  async function handleProcessCompletion(status, payment_id){
    console.log("Reached at the final step : ", status, payment_id)
    setOpenEditModal(false)
    
    setFlashMessage("success","Your booking has been places successfully.")
  }

  return (
    <CustomerTheme>
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <SummaryCard title={"Welcome"} value={"RaghuRam Sharma "} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <SummaryCard title={"Upcoming Booking"} value={"12th Oct 2022 @ 3pm"} button={<BookingButton />} />
          </Grid>
          <Grid item xs={12} md={12} lg={7}>
            {/* <CurrentBookings bookingsPassed={bookings} openBookingModal={openBookingModal} /> */}
          </Grid>
          <Grid item xs={12} md={12} lg={5}>
            {/* <UpcomingBookings bookingsPassed={bookings} openBookingModal={openBookingModal}/> */}
          </Grid>
        </Grid>
        
    </Content>
   </CustomerTheme>
  );
}
