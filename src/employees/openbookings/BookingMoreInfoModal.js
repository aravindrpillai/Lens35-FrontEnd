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
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheatersIcon from '@mui/icons-material/Theaters';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

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

  return (
      <BootstrapDialog onClose={() => {modalHandle(false) }} open={isModalOpen} >
        <BootstrapDialogTitle onClose={() => {modalHandle(false) }}> Select Services </BootstrapDialogTitle>
        <DialogContent dividers>
          
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            
              <ListItem key={1} secondaryAction={ <Checkbox checked={false} /> }  >
                  <ListItemButton>
                      <IconButton> <CameraAltIcon /> </IconButton>
                      <ListItemText primary={"Photography"} />
                  </ListItemButton>
              </ListItem>
              

            </List>


        </DialogContent>
        <DialogActions>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button autoFocus > "Select All" </Button>
                <Button autoFocus onClick={() => {modalHandle(false); }}> Confirm Booking </Button>
            </Stack>
        </DialogActions>
      </BootstrapDialog>
  );
}
