import { CircularProgress, MenuItem, Select, TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/ContextProvider";
import {EMPLOYEE_APIS, POSTAL_CODE_SEARCH_API} from "../../util/Properties";
import { getForPostalCode, post } from "../../util/Service";
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';


export default function BaseLocationField({setOpenModal, base_location_city, base_location_pincode, modalCallBackHandler}){
  
  const [postalCode, setPostalCode] = React.useState(null)
  const [postalCodeError, setPostalCodeError] = React.useState(null)
  const [cityList, setCityList] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [loading, setLoading] = React.useState(false)
  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)

  useEffect(e=>{
    setSelectedCity(base_location_city)
    setPostalCode(base_location_pincode)
  },[base_location_pincode])


  async function save(){
    clearFlashMessage()
    if(postalCode === null || postalCode === "" || selectedCity === "" || selectedCity === null){
      setPostalCodeError("Pincode and city are mandatory")
      return
    }
    let data = {
      base_location_pincode : postalCode,
      base_location_city : selectedCity 
    }

    let response = await post(EMPLOYEE_APIS.UPDATE_EMPLOYEE_BASE_LOCATION, data)
    if(response["status"] === true){
      modalCallBackHandler("base_location_pincode", postalCode)
      modalCallBackHandler("base_location_city", selectedCity)
      setFlashMessage("success","Base Location updated successfully")
      setOpenModal(false)
    }else{
      setPostalCodeError("Failed to Update Base Location")
      console.log("Failed to update base_location : ", response["message"][0])
    }
  }

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
      if(!cList.includes(selectedCity)){
        setSelectedCity(cList[0])
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
      <br/>
      <TextField
            fullWidth error={postalCodeError != null}
            label="Base Location Postal Code"
            type="number"
            value={postalCode === null ? "" : postalCode}
            onInput={(e) => { e.target.value = e.target.value ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 6) : e.target.value }}
            onChange = {(e)=>{setPostalCode(e.target.value)}}
            helperText={postalCodeError}
          />
      <br/>
      <br/>
        {cityList.length>0 && 
        <Select fullWidth defaultValue={cityList[0]} value={selectedCity} onChange={e=>{setSelectedCity(e.target.value)}}>
          {
            cityList.map((city)=>(
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))
          }
        </Select>
        }
        {
          loading && <center><CircularProgress /></center>
        }
        

      <br/><br/>

        <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={(e)=>{setOpenModal(false)}} >
                <DisabledByDefaultTwoToneIcon /> &nbsp; Cancel
            </Button>
            <Button onClick={save} variant="contained" color="primary"  disabled={false}>
                <CheckBoxTwoToneIcon /> &nbsp; Save</Button>
        </Stack>
    </React.Fragment>
  )
}