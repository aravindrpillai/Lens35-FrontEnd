import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';

const bookings = ['Aravind R Pillai on Dec 3rd at 3pm', 'Sukumara Kurup on Dec 14rd at 6pm'];

export function SelectBookings(props) {
  const { onClose, selectedValue, open } = props;


  return (
    <Dialog onClose={(e)=>{onClose(selectedValue)}} open={open}>
      <DialogTitle>Select Booking</DialogTitle>
      <List sx={{ pt: 0 }}>
        {bookings.map((booking) => (
          <ListItem button onClick={(e) => onClose(booking)} key={booking}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={booking} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}