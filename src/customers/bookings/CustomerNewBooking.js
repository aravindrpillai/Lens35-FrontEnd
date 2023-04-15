import { Box, Button, makeStyles, Modal, Paper, Typography } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import Content from "../../Components/Content";
import { BookingContextProvider } from "../../contexts/BookingContextProvider";
import CustomerTheme from "../CustomerTheme";
import ActiveBookings from "./ActiveBookings";
import AddOrEditBooking from "./AddOrEditBooking";

const useStyles = makeStyles((theme) => ({
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const modalStyle = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:550,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function CustomerNewBooking() {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedBookingID, setSelectedBookingID] = useState(null)

  return (
    <CustomerTheme>
    <Content>
      <Modal keepMounted open={openModal} onClose={(e) => setOpenModal(false)} >
        <Box sx={modalStyle}>
          <BookingContextProvider booking_id={selectedBookingID}>
            <AddOrEditBooking/>
          </BookingContextProvider> 
        </Box>
      </Modal>
      <Paper elevation={2} className={classes.summaryCard}>
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"} >
          <Typography color={"primary"} variant="h5" gutterBottom>Bookings</Typography>
          <Button variant="outlined" onClick={(e) => {setSelectedBookingID(null); setOpenModal(true)}}>Add New Booking</Button>
        </Stack>
        <ActiveBookings />
      </Paper>
   </Content>
   </CustomerTheme>
  );
}


