import React from "react";
import Button from "@material-ui/core/Button";
import Timer from "../Components/Timer";
import { useState } from "react";
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import { FormControl, Input, InputLabel } from "@material-ui/core";
import { post } from "../util/Service";
import {CUSTOMER_APIS, EMPLOYEE_APIS} from "../util/Properties";
import { useEffect } from "react";
import { generateUUID4 } from "../util/UUID";


export default function Login(props){

    const [otpStatus, setOtpStatus] = useState(false)
    const [isOtpTimerRunning, setIsOtpTimerRunning] = useState(false)
    const [message, setMessage] = useState(null)
    let countryCode = "+91-"
    const [mobileNumber, setMobileNumber] = useState("7767991693")
    const [otp, setOTP] = useState("")

    useEffect(e=>{
      const query = new URLSearchParams(window.location.search);
      let qMsg = query.get("message")
      if(qMsg !== null && qMsg !== ""){
        setMessage(qMsg)
      }

    },[])


    /**
     * Function to push OTP
     */
    async function pushOTP(){
      setMessage(null);
      setIsOtpTimerRunning(false)
      if(mobileNumber === null || mobileNumber === ""){
        setMessage("Mobile Number cannot be empty")
      }
      setMessage("Sending OTP. Please wait");
      let url = props.user_type === "employee" ? EMPLOYEE_APIS.OTP_REQUEST_SERVICE : CUSTOMER_APIS.OTP_REQUEST_SERVICE
      
      var otpResponse = await post(url, {  mobile_number : mobileNumber }, false)
      if(otpResponse["status"] === true){
        setOtpStatus(true);
        setIsOtpTimerRunning(true)
        setMessage("OTP successfully sent.")
        setOTP(otpResponse["data"]["otp_for_testing_purpose"].toString()) //TODO- REMOVE this code
      }else{
        setMessage(otpResponse["messages"][0])
        setOtpStatus(false);
      }
    }
  
    /**
     * Function to validate OTP
     * once validated, the callBackHandler will be called
     */
    async function validateOTPAndLogin(){
      console.log("Validating OTP......");
      setMessage(null);
      if(mobileNumber === null || mobileNumber === ""){
        setMessage("Mobile Number cannot be empty")
      }
      if(otp === null || otp === ""){
        setMessage("OTP cannot be empty")
      }
      setMessage("Validating OTP. Please wait");
      var request = {
        mobile_number : mobileNumber,
        otp : otp,
        keep_active : false,
        device_id : generateUUID4()
      }
      let url = props.user_type === "employee" ? EMPLOYEE_APIS.OTP_GENERATE_TOKEN : CUSTOMER_APIS.OTP_GENERATE_TOKEN
      var otpResponse = await post(url, request, false)
      if(otpResponse["status"] === true){
        let data = otpResponse["data"]
        setMessage(null)
        console.log("User Type On Login Auth : ", props.user_type)
        if(props.user_type === "employee"){
          window.sessionStorage.setItem("Employee-Token", data["Token"])
          window.sessionStorage.setItem("Employee-Identifier", data["Identifier"])
          window.sessionStorage.setItem("Employee-Device-Id", data["Device-Id"])
        }
        else if(props.user_type === "customer"){
          window.sessionStorage.setItem("Customer-Token", data["Token"])
          window.sessionStorage.setItem("Customer-Identifier", data["Identifier"])
          window.sessionStorage.setItem("Customer-Device-Id", data["Device-Id"])
        }else{
          handleError(props.user_type, "Access Restricted : Unknown user.")
          return
        }
        props.postSuccessfullAuthenticationHandler()
      }else{
        handleError(props.user_type, otpResponse["messages"][0])
      }
    }

    /**
     * 
     * @param {Function to handle the error} user_type 
     * @param {*} message 
     */
    function handleError(user_type, message){
      if(user_type === "employee"){
        window.sessionStorage.setItem("Employee-Token", null)
        window.sessionStorage.setItem("Employee-Identifier", null)
        window.sessionStorage.setItem("Employee-Device_Id", null)
      }
      if(user_type === "customer"){
        window.sessionStorage.setItem("Customer-Token", null)
        window.sessionStorage.setItem("Customer-Identifier", null)
        window.sessionStorage.setItem("Customer-Device_Id", null)
      }
      setMessage(message)
    }
  
    /**
     * Call back handler of timer expiry
     */
    function otpTimeUpCallBackHandler(){
        setIsOtpTimerRunning(false)
    }

    return (
        <React.Fragment>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel>Mobile Number</InputLabel>
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
                endAdornment={
                  <Button 
                    variant="contained" disableElevation color="primary"
                    onClick={pushOTP} disabled = {isOtpTimerRunning}
                    >
                    <SendToMobileIcon/>&nbsp;&nbsp;
                    {
                      isOtpTimerRunning &&
                      <Timer initialMinute={0} initialSeconds={10} timerCallBack={otpTimeUpCallBackHandler} />
                    }
                    { (! isOtpTimerRunning) && <span>OTP</span> }
                  </Button>
                }
              />
            </FormControl>    

            <br/>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
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
                <br/> { message && <span>{message}</span> }<br/><br/>
                {otpStatus && <Button variant="contained" disableElevation color="primary" onClick = {validateOTPAndLogin} > Sign In </Button>}
            </FormControl>
        </React.Fragment>
    )
}