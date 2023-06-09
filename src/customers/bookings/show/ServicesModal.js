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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { EVENTS } from '../../../util/Constants';

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

export default function ServicesModal({openModal, handleModalOpen, serviceSelectionCallBack, selectedEvents}) {

  const [checked, setChecked] = React.useState([])
  const [allChecked, setAllChecked] = React.useState(false)
  
  useEffect(e=>{setChecked(selectedEvents)},[selectedEvents])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  function selectAllEventsHandler(){
    let s = []
    if(!allChecked){
      EVENTS.forEach(event=>( s.push(event.type) ))
    }
    setChecked(s)
    setAllChecked(!allChecked)
  }


  return (
      <BootstrapDialog onClose={() => {handleModalOpen(false) }} open={openModal} >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {handleModalOpen(false) }}> Select Services </BootstrapDialogTitle>
        <DialogContent dividers>
          
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {EVENTS.map((event) => {
                const labelId = `checkbox-list-secondary-label-${event.id}`;
                return (
                <ListItem key={event.id}
                    onClick={handleToggle(event.type)}
                    secondaryAction={ <Checkbox edge="end" checked={checked.indexOf(event.type) !== -1} /> } 
                    >
                    <ListItemButton>
                        <ListItemAvatar> <Avatar src={event.url} /> </ListItemAvatar>
                        <ListItemText id={labelId} primary={event.title} />
                    </ListItemButton>
                </ListItem>
                );
            })}
            </List>


        </DialogContent>
        <DialogActions>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button autoFocus onClick={selectAllEventsHandler}> {allChecked ? "Unselect All" : "Select All"} </Button>
                <Button autoFocus onClick={() => {serviceSelectionCallBack(checked); handleModalOpen(false); }}> Fetch Bookings </Button>
            </Stack>
        </DialogActions>
      </BootstrapDialog>
  );
}
