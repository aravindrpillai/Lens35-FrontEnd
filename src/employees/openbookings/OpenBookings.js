import React, { useState } from "react";
import Content from "../../Components/Content";
import { Button, Grid, IconButton, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import EmployeeTheme from "./../EmployeeTheme";
import { useEffect } from "react";
import { EMPLOYEE_APIS } from "../../util/Properties";
import { post } from "../../util/Service";
import EachBookingTile from "./EachBookingTile";
import { getDefaultBookingStartDate } from "../../util/DateUtil";
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

export default function OpenBookings() {
  const [openServiceModal, setOpenServiceModal] = React.useState(false)
  const [servicesSelected, setServicesSelected] = React.useState([])
  const [bookingDate, setBookingDate] = useState(getDefaultBookingStartDate())
  
  const [events, setEvents] = useState([])
  const [preferred, setPreferred] = useState(true)
  const [photography, setPhotography] = useState(true)
  const [videography, setVideography] = useState(true)
  const [drone, setDrone] = useState(true)
  const [photoEditor, setPhotoEditor] = useState(true)
  const [videoEditor, setVideoEditor] = useState(true)



  useEffect(e=>{

  },[])

  function handleModalOpen(open){
    setOpenServiceModal(open)
  }

  async function loadOpenBookings(){
    let body = {
      "distance_range":50,
      "event_date": "2023-03-23",
      "photography" : true,
      "videography" : true,
      "drone_photography" : true,
      "photo_editing" : true,
      "video_editing" : true
    }
    let response = await post(EMPLOYEE_APIS.LIST_OPEN_BOOKINGS, body)
    console.log(response)
    if(response["status"] === true){}
  }

  function serviceSelectionCallBack(services){
    setServicesSelected(services)
  }


  return (
    <EmployeeTheme>
      <Content>
          <Grid container spacing={1}>

          <Grid item xs={12} md={12} lg={12}>
            <SearchBar />
          </Grid>


            <Grid item xs={12} md={6} lg={3}>
              <EachBookingTile />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <EachBookingTile />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <EachBookingTile />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <EachBookingTile />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <EachBookingTile />
            </Grid>
            
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
  
              <Select variant="outlined" labelId="distance-id" id="distance-id" value={"10"} label="Distance" >
                <MenuItem value={5}>5 Km</MenuItem>
                <MenuItem value={10}>10 Km</MenuItem>
                <MenuItem value={15}>15 Km</MenuItem>
                <MenuItem value={20}>20 Km</MenuItem>
                <MenuItem value={30}>30 Km</MenuItem>
                <MenuItem value={40}>40 Km</MenuItem>
                <MenuItem value={50}>50 Km</MenuItem>
              </Select>
  
              <ServicesModal openModal={openServiceModal} handleModalOpen={handleModalOpen} serviceSelectionCallBack={serviceSelectionCallBack}/>
              <Button variant="outlined" onClick={e=>{handleModalOpen(true)}}><SensorOccupiedRoundedIcon color={servicesSelected.length > 0 ? "primary" : "default"}/>&nbsp;&nbsp;Services&nbsp;({servicesSelected.length})</Button>
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
