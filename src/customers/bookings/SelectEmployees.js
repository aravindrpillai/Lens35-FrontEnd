import * as React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import { CardActionArea, CardContent, CardMedia, FormControl, FormControlLabel, Radio, RadioGroup, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import { BookingContext } from '../../contexts/BookingContextProvider';

export default function SelectEmployees() {
    const { 
        photographer,  videographer,
        photographerPreference , setPhotographerPreference,
        videographerPreference , setVideographerPreference
    } = React.useContext(BookingContext)

    const [filter, setFilter] = React.useState(photographer ? "photographers" : "videographers")

    const [data, setData] = React.useState([
        { image_url:"/employees/1.JPG", photographer:true, videographer:false, employee_name: "Aravind R Pillai", employee_id: "1", rating: 4.5, portfolio: "www.facebook.com" },
        { image_url:"/employees/2.JPG", photographer:false, videographer:true, employee_name: "Peter Borough", employee_id: "2", rating: 2, portfolio: "www.facebook.com" },
        { image_url:"/employees/3.JPG", photographer:true, videographer:false, employee_name: "Smack Eric", employee_id: "3", rating: 4, portfolio: "www.facebook.com" },
        { image_url:"/employees/4.JPG", photographer:true, videographer:false, employee_name: "Rosie Thomas", employee_id: "4", rating: 4, portfolio: "www.facebook.com" },
        { image_url:"/employees/5.JPG", photographer:true, videographer:false, employee_name: "Ellie Mark", employee_id: "5", rating: 3, portfolio: "www.facebook.com" },
        { image_url:"/employees/6.JPG", photographer:true, videographer:false, employee_name: "Guna Tuba", employee_id: "6", rating: 5, portfolio: "www.facebook.com" },
        { image_url:"/employees/7.JPG", photographer:true, videographer:false, employee_name: "Siboos Tery", employee_id: "7", rating: 3.5, portfolio: "www.facebook.com" },
        { image_url:"/employees/8.JPG", photographer:false, videographer:true, employee_name: "Rick Mery", employee_id: "8", rating: 2, portfolio: "www.facebook.com" },
        { image_url:"/employees/9.JPG", photographer:true, videographer:false, employee_name: "Teressa Meri", employee_id: "9", rating: 1, portfolio: "www.facebook.com" },
        { image_url:"/employees/10.JPG",photographer:false, videographer:true, employee_name: "Tesla Gig", employee_id: "10", rating: 4, portfolio: "www.facebook.com" },
    ])
 
    function updateSelection(selectedEmployeeID){
        let employees = []
        data.forEach(function (employee, i) {
            if(employee.employee_id == selectedEmployeeID){
                if(filter === "videographers"){
                    if(videographerPreference.includes(selectedEmployeeID)){
                        setVideographerPreference(videographerPreference.filter(pref=> pref != selectedEmployeeID))
                    }else{
                        setPhotographerPreference([...photographerPreference, selectedEmployeeID])
                    }
                }
                if(filter === "photographers"){
                    if(photographerPreference.includes(selectedEmployeeID)){
                        setPhotographerPreference(photographerPreference.filter(pref=> pref != selectedEmployeeID))
                    }else{
                        setPhotographerPreference([...photographerPreference, selectedEmployeeID])
                    }
                }
            }
            employees.push(employee)
        })
        setData(employees)
    }


  return (
    <Grid container spacing={2} sx={{position:"relative "}}>
        
        {(photographer && videographer) &&  
        <Grid key="r_btn" item xs={12} md={12} lg={12}>
            <FormControl>
                <RadioGroup row >
                    {photographer && <FormControlLabel value="photo" checked={filter==="photographers"} onClick={(e)=>{setFilter("photographers")}}  control={<Radio />} label="Photographers" />}
                    {videographer && <FormControlLabel value="video" checked={filter==="videographers"} onClick={(e)=>{setFilter("videographers")}}  control={<Radio />} label="Videographers" />}
                </RadioGroup>
            </FormControl>
        </Grid>
        }

        <Grid key="r_btn" item xs={12} md={12} lg={12}>
            <Typography><font size="2">Please be noted that the selected photographers/videographers are subject to their availability and preference</font></Typography>
        </Grid>

        {data.filter(d=> ((d.photographer === true && filter === "photographers") || (filter === "videographers" && d.videographer === true)) ).map(d=>( 
            <Grid onClick={e=>{updateSelection(d.employee_id)}} key={d.employee_id} item xs={6} md={6} lg={6}>
               <Card sx={{ maxWidth: 345}} >
                    <CardActionArea>
                        <CardMedia component="img" height="200" image={d.image_url} />
                        <CardContent >
                            <Typography gutterBottom variant="h6" component="div"> 
                                <Stack direction="row" justifyContent="space-between"> 
                                <span>{d.employee_name} </span>
                                {
                                    (photographerPreference.includes(d.employee_id) ||
                                    videographerPreference.includes(d.employee_id)
                                    ) && <CheckCircleIcon color="primary"/>
                                }
                                </Stack>
                            </Typography>
                            <Stack direction="row" justifyContent="space-between">
                                <Rating name="read-only" value={d.rating} readOnly />
                                <Link href={d.portfolio}> Portfolio </Link>
                            </Stack>
                            
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        ))
        }

    </Grid>
  )
}
