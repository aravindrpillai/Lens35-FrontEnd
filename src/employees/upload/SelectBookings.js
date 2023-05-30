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
import { AppContext } from '../../contexts/ContextProvider';
import { EMPLOYEE_APIS } from '../../util/Properties';
import { get } from '../../util/Service';
import { formatServiceName, formatEventName } from '../../util/StringUtil';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function SelectBookings({ open, openHandler, serviceSelectionCallBackHandler }) {

  const { setFlashMessage } = React.useContext(AppContext)

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
      <DialogTitle>Select A Service</DialogTitle>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav" >
          {bookings && bookings.map(booking=>(
            <React.Fragment key={booking.booking_id}>
            <ListItemButton onClick={()=>{handleBookingExpandionClick(booking.booking_id)}}>
              <ListItemIcon><InboxIcon /> 
                </ListItemIcon> 
                <ListItemText
                  primary={
                    <div style={{ whiteSpace: 'pre-line' }}>
                      <font size="2">
                        <b>{formatEventName(booking.event)}</b> on {booking.event_date} 
                        <br/>By {booking.customer_name}
                        <br/>at&nbsp;{booking.event_address}
                      </font>
                    </div>
                  }
                />
                {openBooking === booking.booking_id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openBooking === booking.booking_id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {booking.services && booking.services.map(service=>(
                  <ListItemButton  onClick={()=>{handleServiceSelection(booking, service)}} key={service.service_id} sx={{ pl: 4 }}> 
                    <ListItemIcon> 
                    {!service.closed && <RadioButtonCheckedIcon/>}  
                    {service.closed && <CheckCircleIcon style={{ color: "green" }}/>}  
                    </ListItemIcon>
                    <ListItemText primary={formatServiceName(service.service)}/>
                    </ListItemButton>
                    
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