import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Tooltip } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheatersIcon from '@mui/icons-material/Theaters';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../contexts/ContextProvider';
import { EVENTS } from '../../../util/Constants';
import { useNavigate } from 'react-router-dom';

export default function EachBookingTile({booking, openBooking, cancellBookingHandler}) {

  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
  const [bookingEvent, setBookingEvent] = useState()
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const navigate = useNavigate() 

  useEffect(eff=>{
    let e = EVENTS.find(event => event.type === booking.event)
    if(e === undefined || e === null){
      setFlashMessage("error","Failed to load booking. No matching refrence found")
      console.log("No Matching booking reference found")
    }else{
      
      let data = {
        booking_id:booking.booking_id,
        url:e.url,
        title:e.title,
        event_date:booking.event_date,
        event_start_time:booking.event_start_time,
        event_duration:booking.event_duration,
        services : [...new Set(booking.services.map((service) => { return service.service }))]
      }
      setBookingEvent(data)
      setIsDataLoaded(true)
      clearFlashMessage()
    }
  }, [booking])


  function viewBooking(booking_id){
    navigate("../cust/booking/"+booking_id)
  }

  return (
    <React.Fragment>
    {!isDataLoaded &&  
      <Card sx={{ maxWidth: 345 }}>Loading...</Card>  
    }
    {
    isDataLoaded &&
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={bookingEvent.url} />
      <CardContent>
        
        

        <Stack justifyContent={"space-between"} direction={"row"} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            <label>{bookingEvent.title}</label>
          </Typography>
          <Stack justifyContent={"flex-start"} direction={"row"} >
          {
            bookingEvent.services.map(service=>(
              <div key={service}>
              {(service == "photography") && <Tooltip key={"p"+service} title="Photography" placement="top" arrow><><CameraAltIcon/>&nbsp;</></Tooltip>}
              {(service == "videography") && <Tooltip key={"v"+service} title="Videography" placement="top" arrow><><VideoCameraFrontIcon/>&nbsp;</></Tooltip>}
              {(service == "drone_photography") && <Tooltip key={"d"+service} title="Drone Photography" placement="top" arrow><><LocalAirportIcon/>&nbsp;</></Tooltip>}
              {(service == "photo_editor") && <Tooltip key={"pe"+service} title="Photo Editing" placement="top" arrow><><WallpaperIcon/>&nbsp;</></Tooltip>}
              {(service == "video_editor") && <Tooltip key={"ve"+service} title="Video Editing" placement="top" arrow><><TheatersIcon/>&nbsp;</></Tooltip>}
              </div>
            ))
          }
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.secondary">{bookingEvent.event_date} @ {bookingEvent.event_start_time} for {bookingEvent.event_duration} Hours</Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{openBooking(booking.booking_id)}}>Edit</Button>
        <Button size="small" onClick={()=>{cancellBookingHandler(booking.booking_id)}}>Cancel</Button>
        <Button size="small" onClick={()=>{viewBooking(booking.booking_id)}}>Gallery</Button>        
      </CardActions>
    </Card>
    }
    </React.Fragment>
  )
}
