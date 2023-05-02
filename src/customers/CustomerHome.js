import React, { useContext, useEffect } from "react";
import Content from "../Components/Content";
import SummaryCard from "../Components/SummaryCard";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import CustomerTheme from "./CustomerTheme";
import { AppContext } from "../contexts/ContextProvider";
import { get } from "../util/Service";
import { CUSTOMER_APIS } from "../util/Properties";
import { useNavigate } from "react-router-dom";


export default function CustomerHome() {

  const { clearFlashMessage, setFlashMessage, customerUserName, setCustomerUserName } = useContext(AppContext)
  const [openEditModal, setOpenEditModal] = React.useState(false)
  const [selectedBookingID, setSelectedBookingID] = React.useState(null)
  const [bookings, setBookings] = React.useState([])
  const navigate = useNavigate()

  function openBookingModal(booking_id){
    console.log("BOOKING -- ID --FOR -- MODAL ---> ", booking_id)
    booking_id = (booking_id === null || booking_id === "" || booking_id === undefined) ? null : booking_id
    setSelectedBookingID(booking_id)
    setOpenEditModal(true)
  }

  function BookingButton(){
    return (
      <Button variant="contained" color="primary" onClick={()=>{navigate("../cust/bookings")}} style={{float: 'right'}}>Show Bookings</Button>
    )
  }

  useEffect(e=>{
    clearFlashMessage()
    console.log("Starting")
    async function loadHomeData(){
      var resp = await get(CUSTOMER_APIS.FETCH_PROFILE_INFO)
      if(resp["status"] === true){
        const data = resp["data"]
        if(data["full_name"] !== null){
          setCustomerUserName(data["full_name"])
        }else{
          navigate("../cust/profile")
        }
      }else{
        setFlashMessage("error","Failed to load page. "+resp["messages"][0])
      }
      console.log(resp)
    }
    loadHomeData()
  },[])



    return (
    <CustomerTheme>
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <SummaryCard title={"Welcome"} value={customerUserName} />
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
