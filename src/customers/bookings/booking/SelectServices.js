import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { AppContext } from '../../../contexts/ContextProvider';
import { CUSTOMER_APIS } from '../../../util/Properties';
import { get } from '../../../util/Service';
import { useState } from 'react';
import { formatServiceName } from '../../../util/StringUtil';

export function SelectServices({ open, openHandler, booking_id, selectedServiceHandler }) {

  const { setFlashMessage, setLoading } = React.useContext(AppContext)
  const [services, setServices] = useState([])


  async function loadServices(){
    setLoading(true)
    let response = await get(CUSTOMER_APIS.FETCH_SERVICES+booking_id+"/")
    if(response["status"] === true){
        setServices(response["data"])
    }else{
        setFlashMessage("error","Failed to load booking information. Please try again")
    }
    setLoading(false)
  }

  React.useEffect(eff=>{
    loadServices()
  },[booking_id])

  return (
    <Dialog onClose={()=>{openHandler(false)}} open={open}>
      <DialogTitle>Select Service</DialogTitle>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav" >
          {services && services.map(service=>(
            <ListItemButton key={service.service_id} onClick={()=>{selectedServiceHandler(service)}}>
              <ListItemIcon><InboxIcon /> </ListItemIcon> 
              {service.closed &&
              <ListItemText primary={formatServiceName(service.service)+" by "+service.employee.full_name} />
              }
              {service.employee !== null && !service.closed &&
              <ListItemText primary={formatServiceName(service.service)+" by "+service.employee.full_name+" (Not Closed)"} />
              }
              {service.employee === null &&
              <ListItemText primary={formatServiceName(service.service)+" (Not Accepted) "} />
              }
              
            </ListItemButton>
          ))
          }
        </List>
    </Dialog>
  );
}