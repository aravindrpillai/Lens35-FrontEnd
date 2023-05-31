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
import Checkbox from '@mui/material/Checkbox';
import { CircularProgress, Stack, Typography } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheatersIcon from '@mui/icons-material/Theaters';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { get, post } from '../../util/Service';
import { EMPLOYEE_APIS } from '../../util/Properties';
import { AppContext } from '../../contexts/ContextProvider';
import { useState } from 'react';
import ConfirmationModal from '../../Components/ConfirmationModal';

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

export default function ModifyBookingModal({isModalOpen, modalHandle, booking_id, callBackHandler}) {
  const { clearFlashMessage, setFlashMessage, setLoading } = React.useContext(AppContext)
  
  const [services, setServices] = useState(null)
  const [selectedServices, setSelectedServices] = useState([])
  const [removedServices, setRemovedServices] = useState([])
  const [openConfirmation, setOpenConfirmation] = useState(false)

  React.useEffect(eff=>{
    if(isModalOpen){
      loadBookingInfo()
    }
  },[booking_id, isModalOpen])

  async function loadBookingInfo(){
    clearFlashMessage()
    setLoading(true)
    let response = await get(EMPLOYEE_APIS.LIST_SERVICES_OPEN_FOR_UPDATE.concat(booking_id).concat("/"))
    console.log("------> SELECTED Booking Resp ----> ",response)
    if(response["status"] === true){
      let ss = [];
      response.data.forEach(s => {
        if(!s.is_still_open){
          ss.push(s.service_id)
        }
      })
      setSelectedServices(ss)
      setServices(response["data"])
    }else{
      setFlashMessage("error","Failed to load booking information. Please try again")
    }
    setLoading(false)
  }


  async function cancellConfirmHandler(){
    setLoading(true)
    let data = {
      "booking_id": booking_id,
      "service_ids": selectedServices
    }
    let response = await post(EMPLOYEE_APIS.MODIFY_MY_BOOKING, data)
    console.log("------> MODIFY Booking Resp ----> ",response)
    if(response["status"] === true){
      callBackHandler()
    }else{
      setFlashMessage("error","Failed to modify booking. Please try again")
    }
    loadBookingInfo()
    modalHandle(false)
    setOpenConfirmation(false)
    setLoading(false)
  }

  function handleServiceSelection(service_id){
    let ss = selectedServices
    let indx = ss.indexOf(service_id)
    if(indx === -1){
      ss.push(service_id)
    }else{
      ss.splice(indx, 1)
    }
    setSelectedServices(ss)

    var my_services = services.filter(obj => obj.is_still_open === false).map(obj => obj.service);
    var my_new_services = []
    ss.forEach(s=>{
      let sev = services.filter(obj => obj.service_id === s)
      if(sev.length > 0){
        my_new_services.push(sev[0].service)
      }
    })

    let removed_services = my_services.filter(item => !my_new_services.includes(item));
    setRemovedServices(removed_services)
  }

  function proceedHandler(){
    if(removedServices.length > 0){
      setOpenConfirmation(true)
    }else{
      cancellConfirmHandler()
    }
  }

  return (
      <BootstrapDialog onClose={() => {modalHandle(false) }} open={isModalOpen} >
        <ConfirmationModal 
          open={openConfirmation} 
          openHandler={setOpenConfirmation} 
          confirmHandler={cancellConfirmHandler} 
          title={"Confirm Action"} 
          content={
            <font color="red">
            Note: Cancelling approved booking will affect your rating.<br/>
            You have removed <b>{removedServices.length}</b> service(s) costing you <b>Rs.{removedServices.length*200}/-</b><br/>
            This amount will be debitted from you next pay out. 
            </font>
            } 
          confirmButtonLabel="Update"/>
        <BootstrapDialogTitle onClose={() => {modalHandle(false) }}> Select Services </BootstrapDialogTitle>
        <DialogContent dividers>
          
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              { (services === null || services === undefined) && <CircularProgress />  }
              {
              services && services.map(service=>(
                <ListItem key={service.service_id} onClick={()=>{handleServiceSelection(service.service_id)}} 
                  secondaryAction={ 
                  <Checkbox 
                    disabled={!service.does_this_employee_offer_this_service}
                    defaultChecked={!service.is_still_open} 
                    value={selectedServices.indexOf(service.service_id) !== -1}/> 
                  }>
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
            
            {removedServices && removedServices.length > 0 &&
            <React.Fragment>
              <hr/>
              <Typography variant='5'>
                <font color="red">
                Note: Cancelling approved booking will affect your rating.<br/>
                You have removed <b>{removedServices.length}</b> service(s) costing you <b>Rs.{removedServices.length*200}/-</b><br/>
                This amount will be debitted from you next pay out. 
                </font>
              </Typography>
            </React.Fragment>
            }
        </DialogContent>
        <DialogActions>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button autoFocus onClick={()=>{setOpenConfirmation(false); modalHandle(false);}}> Ignore </Button>
                <Button autoFocus onClick={proceedHandler}> Proceed </Button>
            </Stack>
        </DialogActions>
      </BootstrapDialog>
  );
}
