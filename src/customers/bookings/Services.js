import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import { BookingContext } from '../../contexts/BookingContextProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Services({showEmployees}) {

    const {
        photographer , setPhotographer,
        videographer , setVideographer,
        drone , setDrone,
        message , setMessage 
    } = React.useContext(BookingContext)

    
  return (
   <>
    <Grid container spacing={2} sx={{position:"relative "}}>
        <Grid item xs={4} md={4} lg={4}>
            <Card sx={{height:240}} onClick={e=>{setPhotographer(!photographer)}}>
                <CardActionArea>
                    <CardMedia component="img" height="150" image={"/img/still_camera.jpg"} />
                    <CardContent >
                        <Stack direction="row" justifyContent="space-around">
                            <Typography gutterBottom variant="h6" component="div">Photography</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-around">
                            {photographer && <CheckCircleIcon color="primary"/>}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
            <Card sx={{height:240}} onClick={e=>{setVideographer(!videographer)}}>
                <CardActionArea>
                    <CardMedia component="img" height="150" image={"/img/video_camera.jpg"} />
                    <CardContent >
                        <Stack direction="row" justifyContent="space-around">
                            <Typography gutterBottom variant="h6" component="div">Videography</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-around">
                            {videographer && <CheckCircleIcon color="primary"/>}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
            <Card sx={{height:240}} onClick={e=>{setDrone(!drone)}}>
                <CardActionArea>
                    <CardMedia component="img" height="150" image={"/img/drone_camera.jpg"} />
                    <CardContent >
                        <Stack direction="row" justifyContent="space-around">
                            <Typography gutterBottom variant="h6" component="div">Drone</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-around">
                            {drone && <CheckCircleIcon color="primary"/>}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        {(photographer || videographer) &&
        <Grid item xs={12} md={12} lg={12}>
        Select your favourite photographer/videographer from <Link onClick={showEmployees}>here</Link>. 
        <br/>The request will be published to other photographers only if they are unavailable.
        </Grid>
        }
    </Grid>
    </>
  )
}
