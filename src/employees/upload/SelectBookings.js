import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { AppContext } from '../../contexts/ContextProvider';
import { EMPLOYEE_APIS } from '../../util/Properties';
import { get } from '../../util/Service';

export function SelectBookings({ open, openHandler, serviceSelectionCallBackHandler }) {

  const { setFlashMessage, setLoading } = React.useContext(AppContext)

  const [bookings, setBookings] = React.useState([])
  const [openBooking, setOpenBooking] = React.useState(null)

  function handleBookingExpandionClick(booking_id){
    if(openBooking === booking_id){
      setOpenBooking(null)
    }else{
      setOpenBooking(booking_id)
    }
  }

  function handleServiceSelection(booking, service){
    serviceSelectionCallBackHandler(booking, service)
  }

  async function loadBookingInfo(){
    let response = await get(EMPLOYEE_APIS.FETCH_BOOKING_WITH_PENDING_FILE_UPLOAD)
    console.log("------> FETCH BOOKING WITH PENDING FILE UPLOAD ::  ",response)
    if(response["status"] === true){
      setBookings(response["data"])
    }else{
      setFlashMessage("error","Failed to load booking information. Please try again")
    }
  }
  React.useEffect(eff=>{
    loadBookingInfo()
  },[])

  return (
    <Dialog onClose={()=>{openHandler(false)}} open={open}>
      <DialogTitle>Select Booking</DialogTitle>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav" >
          {bookings && bookings.map(booking=>(
            <React.Fragment key={booking.booking_id}>
            <ListItemButton onClick={()=>{handleBookingExpandionClick(booking.booking_id)}}>
              <ListItemIcon><InboxIcon /> </ListItemIcon> <ListItemText primary={booking.event+" on "+booking.event_date} /> {openBooking === booking.booking_id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openBooking === booking.booking_id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {booking.services && booking.services.map(service=>(
                  <ListItemButton  onClick={()=>{handleServiceSelection(booking, service)}} key={service.service_id} sx={{ pl: 4 }}> <ListItemIcon> <StarBorder /> </ListItemIcon><ListItemText primary={service.service} /></ListItemButton>
                ))}
              </List>
            </Collapse>
            </React.Fragment>
          ))
          }
        </List>
    </Dialog>
  );
}