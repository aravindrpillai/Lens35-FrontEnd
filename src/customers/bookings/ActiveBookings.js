import React, { useEffect } from 'react';
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


async function fetchBookings(){
  
}

export default function ActiveBookings() {

  useEffect(e=>{
    fetchBookings()
  },[])

  return (
    <React.Fragment>
      <Table size="small">
        <TableBody>
        <TableRow key={1}>
           <TableCell>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
              <Typography >Birthday Function <br/><font size="2">21st Dec from 7pm to 10pm</font></Typography>
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
         
         <TableRow key={2}>
           <TableCell>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
              <Typography >Portait <br/><font size="2">21st Dec from 7pm to 10pm</font></Typography>
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
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
