import { Input, InputLabel } from "@material-ui/core";
import { Button, FormControl } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import React, { useContext } from "react";
import {CUSTOMER_APIS} from "../../util/Properties";
import { post } from "../../util/Service";
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
import { AppContext } from "../../contexts/ContextProvider";
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import Timer from "../../Components/Timer";

export default function MobileNumberField({mobile_number, setOpenModal, modalCallBackHandler}) {
  
  let countryCode = "+91-"
  const [mobileNumber, setMobileNumber] = React.useState( mobile_number === null || mobile_number ==="" ? "" : mobile_number);
  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
  const [isOtpTimerRunning, setIsOtpTimerRunning] = useState(false)
  const [otpStatus, setOtpStatus] = useState(false)
  const [message, setMessage] = useState(null)
  const [otp, setOTP] = useState("")
  const [updating, setUpdating] = React.useState(false)

    /**
   * Function to push OTP
   */
    async function pushOTP(){
      console.log("Pushing OTP......")
      setUpdating(true)
      setMessage(null)
      setIsOtpTimerRunning(false);
      if(mobileNumber === null || mobileNumber === ""){
        setMessage("Mobile Number cannot be empty")
      }
      setMessage("Sending OTP. Please wait");
      var request = {
        mobile_number : mobileNumber,
        country_code : countryCode
      }
      var otpResponse = await post(CUSTOMER_APIS.FETCH_OTP_FOR_MOBILE_NO_UPDATE, request, false)
      if(otpResponse["status"] === true){
        setOtpStatus(true);
        setIsOtpTimerRunning(true)
        setMessage("OTP successfully sent.")
      }else{
        setMessage(otpResponse["messages"][0])
        setOtpStatus(false);
      }
      setUpdating(false)
    }

  function otpTimeUpCallBackHandler(){
    setIsOtpTimerRunning(false)
  }

  
  async function save(){
    clearFlashMessage()
    if(mobileNumber === null || mobileNumber === ""){
      setMessage("Mobile Number cannot be empty")
      return
    }
    let data = { 
      "mobile_number": mobileNumber, 
      "otp" : otp
    }
    let response = await post(CUSTOMER_APIS.UPDATE_CUSTOMER_MOBILE_NO, data)
    if(response["status"] === true){
      let token_data = response["data"]
      window.sessionStorage.setItem("Customer-Token", token_data["Token"])
      window.sessionStorage.setItem("Customer-Identifier", token_data["Identifier"])
      window.sessionStorage.setItem("Customer-Device-Id", token_data["Device-Id"])
      modalCallBackHandler("mobile_number", mobileNumber)
      setFlashMessage("success","Mobile Number updated successfully")
      setOpenModal(false)
    }else{
      setMessage("Failed: "+response["messages"][0])
      console.log("Failed to update mobile number : ", response["messages"][0])
    }
  }

  return (
    <React.Fragment>

      <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
        <Input
          variant="outlined" required 
          placeholder="9447020535" 
          onInput={(e) => { e.target.value = e.target.value ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 10) : e.target.value }}
          onChange={(e) => { setMobileNumber(e.target.value) }}
          type="number"
          value = {mobileNumber}
          label="Mobile Number" 
          disabled = {isOtpTimerRunning}
          startAdornment={countryCode}
          fullWidth
          endAdornment={
            <Button 
              variant="contained" disableElevation color="primary"
              onClick={pushOTP} disabled = {updating || isOtpTimerRunning || mobile_number === mobileNumber}
              >
              <SendToMobileIcon/>&nbsp;&nbsp;
              {
                isOtpTimerRunning &&
                <Timer initialMinute={0} initialSeconds={10} timerCallBack={otpTimeUpCallBackHandler} />
              }
              { (! isOtpTimerRunning) && <span>OTP&nbsp;</span> }
            </Button>
          }
        />
      </FormControl>  
      <br/><br/>
    {
      otpStatus &&
      <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
        {otpStatus && <InputLabel>OTP</InputLabel> }
        {otpStatus && 
        <Input 
            variant="outlined" 
            required 
            onInput={(e) => { e.target.value = e.target.value ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 6) : e.target.value }}
            onChange={(e) => { setOTP(e.target.value) }}
            type="number"
            value={otp} 
            />
        }
      </FormControl>
    }
     { message && <span><br/>{message}<br/><br/></span> }
      <br/>
      {
      otpStatus &&
      <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={(e)=>{setOpenModal(false)}} disabled={updating} >
              <DisabledByDefaultTwoToneIcon /> &nbsp; Cancel
          </Button>
          <Button onClick={save} variant="contained" color="primary" disabled={updating}>
              <CheckBoxTwoToneIcon /> &nbsp; Save</Button>
      </Stack>
     }
    </React.Fragment>
  )
}