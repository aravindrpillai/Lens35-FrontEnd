import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Checkbox from '@mui/material/Checkbox';
import { CircularProgress, Stack } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheatersIcon from '@mui/icons-material/Theaters';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { get, post } from '../../util/Service';
import { EMPLOYEE_APIS } from '../../util/Properties';
import { AppContext } from '../../contexts/ContextProvider';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}))


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }} >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function BookingMoreInfoModal({isModalOpen, modalHandle, booking}) {
  const { clearFlashMessage, setFlashMessage, setLoading } = React.useContext(AppContext)
  
  const [bookingData, setBookingData] = useState(null)
  const [selectedServices, setSelectedServices] = useState([])

  React.useEffect(eff=>{
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if(isModalOpen){
      loadBookingInfo()
    }
  },[booking, isModalOpen])

  async function loadBookingInfo(){
    clearFlashMessage()
    setLoading(true)
    let response = await get(EMPLOYEE_APIS.FETCH_BOOKING_INFO.concat(booking.booking_id).concat("/"))
    console.log("------> SELECTED Booking Resp ----> ",response)
    if(response["status"] === true){
      var res = response["data"]
      res["selectedServices"] = []
      setBookingData(res)
    }else{
      setFlashMessage("error","Failed to load booking information. Please try again")
    }
    setLoading(false)
  }

  async function confirmBooking(){
    console.log(bookingData.selectedServices)
    clearFlashMessage()
    setLoading(true)

    var data = {
      "booking_id": bookingData.booking_id,
      "service_id_list": bookingData.selectedServices
    }
    let response = await post(EMPLOYEE_APIS.ACCEPT_BOOKING,data)
    console.log("------> ACCEPT Booking Resp ----> ",response)
    if(response["status"] === true){
      
      setLoading(false)
      modalHandle(false)
    }else{
      setFlashMessage("error","Failed to load booking information. Please try again")
    }
  }

  function handleServiceSelection(service_id){
    let s = bookingData
    let indx = s.selectedServices.indexOf(service_id)
    if(indx == -1){
      s.selectedServices.push(service_id)
    }else{
      s.selectedServices.splice(indx, 1)
    }
    setBookingData(s)
  }


  return (
      <BootstrapDialog onClose={() => {modalHandle(false) }} open={isModalOpen} >
        <BootstrapDialogTitle onClose={() => {modalHandle(false) }}> Select Services </BootstrapDialogTitle>
        <DialogContent dividers>
          
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {
                (bookingData === null || bookingData === undefined) &&
                <CircularProgress />  
              }
              {
              bookingData && bookingData.services.map(service=>(
                <ListItem key={service.service_id} onClick={()=>{handleServiceSelection(service.service_id)}} secondaryAction={ <>{service.employee !== null && <CheckCircleOutlineIcon/>} {service.employee === null && <Checkbox checked={service.selectedServices && service.selectedServices.indexOf(service.service_id) != -1} />}</> }  >
                    <ListItemButton>
                        {service.service === "photography" && <><IconButton> <CameraAltIcon /> </IconButton><ListItemText primary="Photography" /></> }
                        {service.service === "videography" && <><IconButton> <VideoCameraFrontIcon /> </IconButton><ListItemText primary="Videography" /></> }
                        {service.service === "drone_photography" && <><IconButton> <LocalAirportIcon /> </IconButton><ListItemText primary="Drone Photography" /></> }
                        {service.service === "photo_editor" && <><IconButton> <WallpaperIcon /> </IconButton><ListItemText primary="Photo Editor" /></> }
                        {service.service === "video_editor" && <><IconButton> <TheatersIcon /> </IconButton><ListItemText primary="Video Editor" /></> }
                    </ListItemButton>
                </ListItem>
              ))
              }

            </List>


        </DialogContent>
        <DialogActions>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button autoFocus onClick={confirmBooking}> Confirm Booking </Button>
            </Stack>
        </DialogActions>
      </BootstrapDialog>
  );
}
