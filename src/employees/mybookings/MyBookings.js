import React, { useContext, useState } from "react";
import Content from "../../Components/Content";
import { Button, Grid, IconButton, Paper, TextField } from "@material-ui/core";
import EmployeeTheme from "../EmployeeTheme";
import { useEffect } from "react";
import { EMPLOYEE_APIS } from "../../util/Properties";
import { post } from "../../util/Service";
import EachBookingTile from "./EachBookingTile";
import { getThisMonthAndYear } from "../../util/DateUtil";
import { Stack } from "@mui/material";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheatersIcon from '@mui/icons-material/Theaters';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ServicesModal from "./ServicesModal";
import SensorOccupiedRoundedIcon from '@mui/icons-material/SensorOccupiedRounded';
import Tooltip from '@mui/material/Tooltip';
import { ALL_EVENT_TYPES } from "../../util/Constants";
import { AppContext } from "../../contexts/ContextProvider";


export default function MyBookings() {
  const { clearFlashMessage, setFlashMessage, setLoading } = useContext(AppContext)
  const [openServiceModal, setOpenServiceModal] = React.useState(false)
  const [bookingData, setBookingData] = useState([])
  const [eventsSelected, setEventsSelected] = React.useState(ALL_EVENT_TYPES)
  const [bookingDate, setBookingDate] = useState(getThisMonthAndYear())
  const [photography, setPhotography] = useState(true)
  const [videography, setVideography] = useState(true)
  const [drone, setDrone] = useState(true)
  const [photoEditor, setPhotoEditor] = useState(true)
  const [videoEditor, setVideoEditor] = useState(true)


  useEffect(e=>{
    loadOpenBookings()
  },[eventsSelected, bookingDate, photography, videography, drone, photoEditor, videoEditor])

  

  function handleModalOpen(open){
    setOpenServiceModal(open)
  }

  async function loadOpenBookings(){
    clearFlashMessage()
    setLoading(true)
    let body = {
      "event_date": bookingDate,
      "photography" : photography,
      "videography" : videography,
      "drone_photography" : drone,
      "photo_editing" : photoEditor,
      "video_editing" : videoEditor,
      "events":eventsSelected
    }
    let response = await post(EMPLOYEE_APIS.LIST_MY_BOOKINGS, body)
    console.log("------> Booking Resp ----> ",response)
    if(response["status"] === true){
      setBookingData(response["data"])
    }else{
      setFlashMessage("error","Failed to load booking information. "+response["messages"])
    }
    setLoading(false)
  }

  function serviceSelectionCallBack(services){
    setEventsSelected(services)
  }

  function bookingUpdateCallBackHander(){
    loadOpenBookings()
    setFlashMessage("success","Successfully updated the booking")
  }


  return (
    <EmployeeTheme>
       
      <Content>
          <Grid container spacing={1}>

            <Grid item xs={12} md={12} lg={12}>
              <SearchBar />
            </Grid>
            
            {
              bookingData.map(booking=>(
                <Grid item xs={12} md={6} lg={3} key={booking.booking_id}>
                  <EachBookingTile booking={booking} bookingUpdateCallBackHandler={bookingUpdateCallBackHander}/>
                </Grid>
              ))
            } 
          </Grid>
    </Content>
   </EmployeeTheme>
  )

  function SearchBar() {
    return (
        <Paper>
          <Stack justifyContent={"space-between"} direction={"row"}>
            <Stack justifyContent={"space-between"} direction={"row"}>
              <TextField variant="outlined"
                label="Event Month"
                type="month"
                onChange={(e) => { console.log(e.target.value); setBookingDate(e.target.value) }}
                value={bookingDate}
                InputLabelProps={{ shrink: true }}
              />
  
              <ServicesModal openModal={openServiceModal} handleModalOpen={handleModalOpen} serviceSelectionCallBack={serviceSelectionCallBack} selectedEvents={eventsSelected}/>
              <Button variant="outlined" onClick={e=>{handleModalOpen(true)}}><SensorOccupiedRoundedIcon color={eventsSelected.length > 0 ? "primary" : "default"}/>&nbsp;&nbsp;Services&nbsp;({eventsSelected.length})</Button>
              
            </Stack>
  
            <Stack justifyContent={"space-between"} direction={"row"}>
              <Tooltip title="Photography" placement="top" arrow><IconButton onClick={e=>{setPhotography(!photography)}} ><CameraAltIcon color={photography ? "primary" : "default"} /> </IconButton></Tooltip>
              <Tooltip title="Videography" placement="top" arrow><IconButton onClick={e=>{setVideography(!videography)}}  ><VideoCameraFrontIcon color={videography ? "primary" : "default"} /> </IconButton></Tooltip>
              <Tooltip title="Drone" placement="top" arrow><IconButton onClick={e=>{setDrone(!drone)}} ><LocalAirportIcon color={drone ? "primary" : "default"} /> </IconButton></Tooltip>
              <Tooltip title="Photo Editor" placement="top" arrow><IconButton onClick={e=>{setPhotoEditor(!photoEditor)}}><WallpaperIcon color={photoEditor ? "primary" : "default"} /> </IconButton></Tooltip>
              <Tooltip title="Video Editor" placement="top" arrow><IconButton onClick={e=>{setVideoEditor(!videoEditor)}} ><TheatersIcon color={videoEditor ? "primary" : "default"} /> </IconButton></Tooltip>
            </Stack>
          </Stack>
        </Paper>
    );
  }
  
}
