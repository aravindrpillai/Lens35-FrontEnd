import * as React from "react";
import { Card, CardContent, CardMedia, Grid, IconButton, } from "@mui/material";
import Stack from "@mui/material/Stack";
import { BookingContext } from "../../../contexts/BookingContextProvider";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SelectServices({ showEmployees }) {
  const {
    photographerSelected, setPhotographerSelected,
    videographerSelected, setVideographerSelected,
    droneSelected, setDroneSelected
  } = React.useContext(BookingContext)


  return (
    <>
      <Grid container spacing={2} sx={{ position: "relative " }}>
        <Grid item xs={12} md={12} lg={4}>
          <Card sx={{ height: 240 }} onClick={()=>{setPhotographerSelected(!photographerSelected)}}>
            <CardMedia component="img" height="150" image={"/img/still_camera.jpg"} />
            <CardContent>
              <Stack direction="column" justifyContent="space-around">
                <center><Typography gutterBottom variant="h6" component="div"> Photography </Typography></center>
                { photographerSelected && <center><CheckCircleIcon color="primary"/></center> }
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Card sx={{ height: 240 }} onClick={()=>{setVideographerSelected(!videographerSelected)}}>
            <CardMedia component="img" height="150" image={"/img/video_camera.jpg"}  />
            <CardContent>
              <Stack direction="column" justifyContent="space-around">
              < center><Typography gutterBottom variant="h6" component="div"> Videography </Typography></center>
                { videographerSelected && <center><CheckCircleIcon color="primary"/></center> }
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Card sx={{ height: 240 }} onClick={()=>{setDroneSelected(!droneSelected)}}>
              <CardMedia component="img" height="150" image={"/img/drone_camera.jpg"} />
              <CardContent>
              
                <Stack direction="column" justifyContent="space-around">
                  <center><Typography gutterBottom variant="h6" component="div">Drone</Typography></center>
                  { droneSelected && <center><CheckCircleIcon color="primary"/></center> }
                </Stack>
              </CardContent>
          </Card>
        </Grid>
      
      </Grid>
    </>
  )
}
