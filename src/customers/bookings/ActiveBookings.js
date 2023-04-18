import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@material-ui/core/TableRow';
import { ButtonGroup, IconButton, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { Stack } from '@mui/system';
import { BOOKING_APIS } from '../../util/Properties';
import { get } from '../../util/Service';


export default function ActiveBookings() {

  const [bookings, setBookings] = useState([])

  async function fetchBookings(){
    var response = await get(BOOKING_APIS.LIST_MY_BOOKINGS)
    console.log("BOOKING RESPONSEc--- > ", response)
    if(response["status"] === true){
      setBookings(response["data"])
    }
  }

  useEffect(e=>{
    fetchBookings()
  },[])

  return (
    <React.Fragment>
      <Table size="small">
        <TableBody>

        {  
         bookings.map(booking=>(
          <TableRow key={booking.booking_id}>
            <TableCell>
              <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <Typography >{booking.event} <br/><font size="2">{booking.event_date} : {booking.event_start_time}</font></Typography>
                <IconButton disabled={true}>
                  <FlipCameraAndroidIcon/><VideocamIcon /><CameraAltIcon/>
                </IconButton>
                <ButtonGroup>
                  <IconButton><EditIcon/></IconButton>
                  <IconButton><DeleteIcon/></IconButton>
                </ButtonGroup>
              </Stack>
            </TableCell>
          </TableRow>
          ))
        } 
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
