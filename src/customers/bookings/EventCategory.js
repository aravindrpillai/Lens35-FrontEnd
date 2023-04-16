import * as React from 'react';
import { Card, Grid } from '@material-ui/core';
import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/system';
import { BookingContext } from '../../contexts/BookingContextProvider';


export default function EventCategory() {

    const { event, setEvent } = React.useContext(BookingContext)

    const [data, setData] = React.useState([
        { url:"/wedding.JPG",      type: "wedding",         title: "Wedding",         selected:false,   },
        { url:"/engagement.JPG",   type: "engagement",      title: "Engagement",      selected:false,   },
        { url:"/family.JPG",       type: "family",          title: "Family",          selected:false,   },
        { url:"/party.JPG",        type: "party",           title: "Party",           selected:false,   },
        { url:"/portrait.JPG",     type: "portrait",        title: "Portrait",        selected:false,   },
        { url:"/event.JPG",        type: "event",           title: "Events",          selected:false,   },
        { url:"/maternity.JPG",    type: "maternity",       title: "Maternity",       selected:false,   },
        { url:"/realestate.JPG",   type: "real_estate",     title: "Real Estate",     selected:false,   },
        { url:"/graduation.JPG",   type: "graduation",      title: "Graduation",      selected:false,   },
        { url:"/officeteam.JPG",   type: "team_and_office", title: "Team & Office",   selected:false,   },
        { url:"/product.JPG",      type: "product",         title: "Product",         selected:false,   },
        { url:"/modelling.JPG",    type: "modelling",       title: "Modelling",       selected:false,   },
        { url:"/food.JPG",         type: "food",            title: "Food",            selected:false,   },
        { url:"/automotive.JPG",   type: "vehicles",        title: "Vehicles",        selected:false,   },
        { url:"/baby.JPG",         type: "baby",            title: "Baby",            selected:false,   },
        { url:"/kids.JPG",         type: "kids",            title: "Kids",            selected:false,   },
        { url:"/sports.JPG",       type: "sport",           title: "Sports & Games",  selected:false,   },
        { url:"/pets.JPG",         type: "pet",             title: "Pets",            selected:false,   },
        { url:"/religious.JPG",    type: "religious",       title: "Religious",       selected:false,   },
        { url:"/shortfilm.JPG",    type: "short_film",      title: "Short Films",     selected:false,   },
        { url:"/other.JPG",        type: "other",           title: "Other",           selected:false,   },     
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
                            <Typography variant="body2" color="text.secondary"> Rs.1000 Per hour  </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        ))
        }
    </Grid>
  )
}
