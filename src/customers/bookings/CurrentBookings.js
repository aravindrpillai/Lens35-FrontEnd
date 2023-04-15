import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import Typography from "@material-ui/core/Typography";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@material-ui/core/TableRow';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { Stack } from '@mui/system';
import { convert24To12, formatDDMMM } from "../../util/DateUtil";

const useStyles = makeStyles((theme) => ({
    summaryCard: {
      margin: theme.spacing(1),
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  }));

  
export default function CurrentBookings({bookingsPassed, openBookingModal}) {
  const classes = useStyles()
  const [bookings, setBookings] = React.useState([])

  useEffect(e=>{
    setBookings(bookingsPassed)
  },[bookingsPassed])

  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Stack direction="row" spacing={2} justifyContent={"space-between"}>
        <Typography color="secondary" variant="h5" gutterBottom>OnGoing Bookings</Typography>
        <Typography color="secondary" variant="h5" gutterBottom>Dec 6th, 2022</Typography>
      </Stack>
      <Table size="small">
        <TableBody>

        {
          bookings
          .filter(d=>(new Date(d.booking_date).toLocaleDateString() === (new Date().toLocaleDateString()) && d.is_active))
          .map(booking=>(
            <TableRow key={booking.booking_id}>
              <TableCell>
                <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                  <Typography >{booking.event_value}<br/><font size="2">{formatDDMMM(booking.booking_date)} from {convert24To12(booking.booking_start_time)} for {booking.booking_duration}Hrs</font></Typography>
                  <IconButton disabled={true}>
                    {booking.photography && <CameraAltIcon/>}
                    {booking.videography && <VideoCameraFrontIcon/>}
                    {booking.drone && <FlipCameraAndroidIcon/>}
                  </IconButton>
                  <ButtonGroup>
                    <IconButton><LaunchIcon/></IconButton>
                  </ButtonGroup>
                </Stack>
              </TableCell>
            </TableRow>
          ))
        }
        
        {
        bookings
        .filter(d=>(new Date(d.booking_date).toLocaleDateString() === (new Date().toLocaleDateString()) && d.is_active)).length === 0
         &&
          <TableRow key={"no_booking"}>
            <TableCell><br/><br/>
              <Stack direction="row" spacing={2} justifyContent={"space-around"}>
                <Typography >No Ongoing bookings<br/><br/></Typography>
              </Stack>
            </TableCell>
          </TableRow>
        }
          
        </TableBody>
      </Table>
    </Paper>
  )
  }