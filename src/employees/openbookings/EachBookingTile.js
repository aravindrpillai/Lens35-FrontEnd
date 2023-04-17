import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack, Tooltip } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheatersIcon from '@mui/icons-material/Theaters';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

export default function EachBookingTile() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image="https://mui.com/static/images/cards/contemplative-reptile.jpg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" justifyContent={"space-between"} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label>Event Name</label> <FavoriteIcon color="info"/>
        </Typography>
        

        <Stack justifyContent={"space-between"} direction={"row"}>
          <Tooltip title="2 Photographers" placement="top" arrow><CameraAltIcon/></Tooltip>
          <Tooltip title="4 Videographers" placement="top" arrow><VideoCameraFrontIcon/></Tooltip>
          <Tooltip title="1 Drone" placement="top" arrow><LocalAirportIcon/></Tooltip>
          <Tooltip title="Photo Editor" placement="top" arrow><WallpaperIcon/></Tooltip>
          <Tooltip title="Video Editor" placement="top" arrow><TheatersIcon/></Tooltip>
        </Stack>

        <br/>
        <Typography variant="body2" color="text.secondary">22nd July 2022 @ 11:00 for 4 Hours</Typography>

        
        <Typography variant="body2" color="text.secondary">12 Km from your location (show in map)</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Accept</Button>
        <Button size="small">Contact</Button>
        <Button size="small">Ignore</Button>
      </CardActions>
    </Card>
  );
}
