import React, { useContext, useState } from "react";
import Content from "../../Components/Content";
import { Button, Grid, IconButton, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import EmployeeTheme from "./../EmployeeTheme";
import { useEffect } from "react";
import { EMPLOYEE_APIS } from "../../util/Properties";
import { post } from "../../util/Service";
import EachBookingTile from "./EachBookingTile";
import { getTomorrowsDate } from "../../util/DateUtil";
import { Stack } from "@mui/material";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheatersIcon from '@mui/icons-material/Theaters';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ServicesModal from "./ServicesModal";
import SensorOccupiedRoundedIcon from '@mui/icons-material/SensorOccupiedRounded';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ALL_EVENT_TYPES } from "../../util/Constants";
import { AppContext } from "../../contexts/ContextProvider";


export default function OpenBookings() {
  const { clearFlashMessage, setFlashMessage, setLoading } = useContext(AppContext)
  const [openServiceModal, setOpenServiceModal] = React.useState(false)
  
  const [bookingData, setBookingData] = useState([])

  const [eventsSelected, setEventsSelected] = React.useState(ALL_EVENT_TYPES)
  const [bookingDate, setBookingDate] = useState(getTomorrowsDate())
  const [distanceRange, setDistanceRange] = useState(10)
  const [preferred, setPreferred] = useState(false)
  const [photography, setPhotography] = useState(true)
  const [videography, setVideography] = useState(true)
  const [drone, setDrone] = useState(true)
  const [photoEditor, setPhotoEditor] = useState(true)
  const [videoEditor, setVideoEditor] = useState(true)


  useEffect(e=>{
    console.log("done-----------------------------2222222222222222")
    loadOpenBookings()
  },[eventsSelected, bookingDate, preferred, photography, videography, drone, photoEditor, videoEditor, distanceRange])

  

  function handleModalOpen(open){
    setOpenServiceModal(open)
  }


  function prepareRequestPayload(){
    return {
      "events":eventsSelected,
      "preferred" : preferred,
      "distance_range":distanceRange,
      "event_date": bookingDate,
      "photography" : photography,
      "videography" : videography,
      "drone_photography" : drone,
      "photo_editing" : photoEditor,
      "video_editing" : videoEditor
    }
  }

  async function loadOpenBookings(){
    clearFlashMessage()
    setLoading(true)
    let body = prepareRequestPayload()
    let response = await post(EMPLOYEE_APIS.LIST_OPEN_BOOKINGS, body)
    console.log("------> Booking Resp ----> ",response)
    if(response["status"] === true){
      setBookingData(response["data"])
    }else{
      setFlashMessage("error","Failed to load booking information. Please try again")
    }
    setLoading(false)
  }

  function serviceSelectionCallBack(services){
    setEventsSelected(services)
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
                  <EachBookingTile booking={booking}/>
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
                label="Event Date"
                type="date"
                onChange={(e) => { setBookingDate(e.target.value) }}
                value={bookingDate}
                InputLabelProps={{ shrink: true }}
              />
  
              <Select variant="outlined" labelId="distance-id" id="distance-id" value={distanceRange} label="Distance" onChange={e=>{setDistanceRange(e.target.value)}}>
                <MenuItem value={5}>5 Km</MenuItem>
                <MenuItem value={10}>10 Km</MenuItem>
                <MenuItem value={15}>15 Km</MenuItem>
                <MenuItem value={20}>20 Km</MenuItem>
                <MenuItem value={30}>30 Km</MenuItem>
                <MenuItem value={40}>40 Km</MenuItem>
                <MenuItem value={50}>50 Km</MenuItem>
              </Select>
  
              <ServicesModal openModal={openServiceModal} handleModalOpen={handleModalOpen} serviceSelectionCallBack={serviceSelectionCallBack} selectedEvents={eventsSelected}/>
              <Button variant="outlined" onClick={e=>{handleModalOpen(true)}}><SensorOccupiedRoundedIcon color={eventsSelected.length > 0 ? "primary" : "default"}/>&nbsp;&nbsp;Services&nbsp;({eventsSelected.length})</Button>
              <Button variant="outlined" onClick={e=>{setPreferred(!preferred)}}><FavoriteIcon color={preferred ? "primary" : "default"}/>&nbsp;&nbsp;Preferred only</Button>
              
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
