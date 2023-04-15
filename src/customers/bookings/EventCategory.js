import * as React from 'react';
import { Card, Grid } from '@material-ui/core';
import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/system';
import { BookingContext } from '../../contexts/BookingContextProvider';


export default function EventCategory() {

    const { event, setEvent } = React.useContext(BookingContext)

    const [data, setData] = React.useState([
        { url:"/wedding.JPG",      type: "WEDDING",         title: "Wedding",         selected:false,   description: "Wedding moments"                },
        { url:"/engagement.JPG",   type: "ENGAGEMENT",      title: "Engagement",      selected:false,   description: "Capture the event"              },
        { url:"/family.JPG",       type: "FAMILY",          title: "Family",          selected:false,   description: "Pictures with your loved ones"  },
        { url:"/party.JPG",        type: "PARTY",           title: "Party",           selected:false,   description: "Capture the event"              },
        { url:"/portrait.JPG",     type: "PORTRAIT",        title: "Portrait",        selected:false,   description: "Capture the event"              },
        { url:"/event.JPG",        type: "EVENT",           title: "Events",          selected:false,   description: "Capture the event"              },
        { url:"/maternity.JPG",    type: "MATERNITY",       title: "Maternity",       selected:false,   description: "Capture the event"              },
        { url:"/realestate.JPG",   type: "REAL_ESTATE",     title: "Real Estate",     selected:false,   description: "Capture the event"              },
        { url:"/graduation.JPG",   type: "GRADUATION",      title: "Graduation",      selected:false,   description: "Capture the event"              },
        { url:"/officeteam.JPG",   type: "TEAM_AND_OFFICE", title: "Team & Office",   selected:false,   description: "Capture the event"              },//
        { url:"/product.JPG",      type: "PRODUCT",         title: "Product",         selected:false,   description: "Capture the event"              },//
        { url:"/modelling.JPG",    type: "MODELLING",       title: "Modelling",       selected:false,   description: "Capture the event"              },//
        { url:"/food.JPG",         type: "FOOD",            title: "Food",            selected:false,   description: "Capture the event"              },//
        { url:"/automotive.JPG",   type: "VEHICLES",        title: "Vehicles",        selected:false,   description: "Capture the event"              },
        { url:"/baby.JPG",         type: "BABY",            title: "Baby",            selected:false,   description: "Capture the event"              },
        { url:"/kids.JPG",         type: "KIDS",            title: "Kids",            selected:false,   description: "Capture the event"              },
        { url:"/sports.JPG",       type: "SPORT",           title: "Sports & Games",  selected:false,   description: "Capture the event"              },//
        { url:"/pets.JPG",         type: "PET",             title: "Pets",            selected:false,   description: "Capture the event"              },//
        { url:"/religious.JPG",    type: "RELIGIOUS",       title: "Religious",       selected:false,   description: "Capture the event"              },//
        { url:"/shortfilm.JPG",    type: "SHORT_FILM",      title: "Short Films",     selected:false,   description: "Capture the event"              },//
        { url:"/other.JPG",        type: "OTHER_EVENTS",    title: "Other",           selected:false,   description: "Capture the event"              },//        
    ])
    

        
    function updateSelectedEvent(type){
        let updated = []
        data.forEach(function (d, i) {
            setEvent(type === event ? null : type)
            updated.push(d)
        })
        setData(updated)
    }


  return (
    <Grid container spacing={2} sx={{position:"relative "}}>
        {
        data.map(d=>(
            <Grid key={d.type} item xs={6} md={6} lg={6} onClick={e=>{updateSelectedEvent(d.type)}}>
                <Card sx={{ maxWidth: 345}}>
                    <CardActionArea>
                        <CardMedia component="img" height="150" image={"/event"+d.url} />
                        <CardContent >
                            <Typography gutterBottom variant="h6" component="div"> <Stack direction="row" justifyContent="space-between"> {d.title} 
                            {(d.type === event) && <CheckCircleIcon color="primary"/>}
                            </Stack></Typography>
                            <Typography variant="body2" color="text.secondary"> {d.description}  </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        ))
        }
    </Grid>
  )
}
