import { CircularProgress, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { BookingContext } from "../../../contexts/BookingContextProvider";
import {POSTAL_CODE_SEARCH_API} from "../../../util/Properties";
import { getForPostalCode } from "../../../util/Service";
import { Grid } from "@mui/material";

export default function EventLocation(){
  
  const { 
      postalCode, setPostalCode,
      city, setCity,
      address, setAddress
   } = useContext(BookingContext)
  

  const [postalCodeError, setPostalCodeError] = React.useState(null)
  const [cityList, setCityList] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  useEffect((e)=>{
    if(postalCode === null || postalCode === "" || parseInt(postalCode) < 100000){
      return
    }
    setCityList([])
    loadAreas()
  },[postalCode])

  async function loadAreas(){
    setLoading(true)
    setPostalCodeError(null)
    let areas = await getForPostalCode(POSTAL_CODE_SEARCH_API+postalCode+"/")
    if(areas["Status"] === "Success"){
      let cList = []
      for(let po of areas["PostOffice"]){
        cList.push(po["Name"])
      }
      setCityList(cList)
      if(!cList.includes(city)){
        setCity(cList[0])
      }
    }else{
      if(areas["Message"] === "No records found"){
        setPostalCodeError("Invalid pincode. Please enter a valid pincode")
      }else{
        setPostalCodeError(areas["Message"])
      }      
      setCityList([])
    }
    setLoading(false)
  }

  return (
    <React.Fragment>
      <Grid container spacing={2} >
            <Grid item xs={12} md={12} lg={12}>
                <TextField fullWidth label="Address" value={address === null ? "" : address} onChange = {(e)=>{setAddress(e.target.value)}} />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <br/>
                <TextField fullWidth error={postalCodeError != null} label="Postal Code" type="number"
                    value={postalCode === null ? "" : postalCode}
                    onInput={(e) => { e.target.value = e.target.value ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 6) : e.target.value }}
                    onChange = {(e)=>{setPostalCode(e.target.value)}}
                    helperText={postalCodeError}
                />
            </Grid>
        
            <Grid item xs={12} md={12} lg={12}>
                <br/> 
                {cityList.length>0 && 
                    <Select fullWidth defaultValue={cityList[0]} value={city} onChange={e=>{setCity(e.target.value)}}>
                        { cityList.map((city)=>( <MenuItem key={city} value={city}>{city}</MenuItem> )) }
                    </Select>
                }
                { loading && <center><CircularProgress /></center> }
            </Grid>   
        </Grid>
    </React.Fragment>
  )
}