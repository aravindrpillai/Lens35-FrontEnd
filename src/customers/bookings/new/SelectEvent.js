import * as React from 'react';
import { Card, Grid } from '@material-ui/core';
import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/system';
import { EVENTS } from '../../../util/Constants';
import { BookingContext } from '../../../contexts/BookingContextProvider';

export default function SelectEvent() {

  const [data, setData] = React.useState(EVENTS)
  const { event, setEvent } = React.useContext(BookingContext)

  function updateSelectedEvent(type){
    let updated = []
    data.forEach(function (d, i) {
      setEvent(type === event ? null : type)
      updated.push(d)
    })
    setData(updated)
  }

  return (
      <React.Fragment>
            <Grid container spacing={2} sx={{position:"relative "}}>
              {
              data.map(d=>(
                  <Grid key={d.type} item xs={12} md={6} lg={6} onClick={e=>{updateSelectedEvent(d.type)}}>
                      <Card sx={{ maxWidth: 345}}>
                          <CardActionArea>
                              <CardMedia component="img" height="150" image={d.url} />
                              <CardContent >
                                  <Typography gutterBottom variant="h6" component="div"> 
                                    <Stack direction="row" justifyContent="space-between"> {d.title} 
                                        {(d.type === event) && <CheckCircleIcon color="primary"/>}
                                    </Stack>
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary"> Rs.1000 Per hour  </Typography>
                              </CardContent>
                          </CardActionArea>
                      </Card>
                  </Grid>
              ))
              }
            </Grid>     
      </React.Fragment>
  )
}
