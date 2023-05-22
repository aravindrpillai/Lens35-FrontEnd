import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack, Tooltip } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheatersIcon from '@mui/icons-material/Theaters';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { EVENTS } from '../../util/Constants';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../contexts/ContextProvider';
import BookingMoreInfoModal from './BookingMoreInfoModal';

export default function EachBookingTile({booking}) {

  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
  const [bookingEvent, setBookingEvent] = useState()
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [openBookingMoreInfoModal, setOpenBookingMoreInfoModal] = useState(false)

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
        distance:booking.distance
      }
      setBookingEvent(data)
      setIsDataLoaded(true)
      clearFlashMessage()
    }
  }, [booking])


  return (
    <React.Fragment>
    {!isDataLoaded &&  
      <Card sx={{ maxWidth: 345 }}>Loading...</Card>  
    }
    {
    isDataLoaded &&
    <Card sx={{ maxWidth: 345 }}>
      <BookingMoreInfoModal isModalOpen={openBookingMoreInfoModal} modalHandle={setOpenBookingMoreInfoModal} booking={bookingEvent} />
      <CardMedia component="img" height="140" image={bookingEvent.url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" justifyContent={"space-between"} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label>{bookingEvent.title}</label> <FavoriteIcon color="info"/>
        </Typography>
        

        <Stack justifyContent={"space-between"} direction={"row"}>
          {
            booking.services.includes("photography") && 
            <Tooltip title="2 Photographers" placement="top" arrow><CameraAltIcon/></Tooltip>
          }
          {
            booking.services.includes("videography") && 
            <Tooltip title="4 Videographers" placement="top" arrow><VideoCameraFrontIcon/></Tooltip>
          }
          {
            booking.services.includes("drone_photography") && 
            <Tooltip title="1 Drone" placement="top" arrow><LocalAirportIcon/></Tooltip>
          }
          {
            booking.services.includes("photo_editor") && 
            <Tooltip title="Photo Editor" placement="top" arrow><WallpaperIcon/></Tooltip>
          }
          {
            booking.services.includes("video_editor") && 
            <Tooltip title="Video Editor" placement="top" arrow><TheatersIcon/></Tooltip>
          }
        </Stack>

        <br/>
        <Typography variant="body2" color="text.secondary">{bookingEvent.event_date} @ {bookingEvent.event_start_time} for {bookingEvent.event_duration} Hours</Typography>

        <Typography variant="body2" color="text.secondary">{bookingEvent.distance} from your location (show in map)</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={e=>{setOpenBookingMoreInfoModal(true)}}>Accept</Button>
        <Button size="small">Contact</Button>
        <Button size="small">Ignore</Button>
      </CardActions>
    </Card>
    }
    </React.Fragment>
  )
}
