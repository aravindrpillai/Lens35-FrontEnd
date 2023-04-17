import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function EachBookingTile() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image="https://mui.com/static/images/cards/contemplative-reptile.jpg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" justifyContent={"space-between"}>
          <label>Event Name</label> <FavoriteBorder />
        </Typography>
        <Typography variant="body2" color="text.secondary">22nd July 2022 @ 11:00 for 4 Hours</Typography>
        <Typography variant="body2" color="text.secondary">Photography(2), Videpography(1)</Typography>
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
