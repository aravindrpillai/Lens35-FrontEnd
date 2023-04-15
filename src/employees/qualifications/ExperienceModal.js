import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from "@material-ui/core";
import EmploymentDateInput from "./EmploymentDateInput";
import Checkbox from '@mui/material/Checkbox';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { get, post } from "../../util/Service";
import {BASE_URL, EMPLOYEE_APIS} from "../../util/Properties";
import { Context } from "../../contexts/ContextProvider";
import { CONSTANTS } from "../../util/Constants";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ExperienceModal(props){
  const { clearFlashMessage, setFlashMessage } = useContext(Context)
  const [experienceId, setExperienceId] = useState(null)
  const [companyName, setCompanyName] = useState("")
  const [companyNameError, setCompanyNameError] = useState(null)
  const [designation, setDesignation] = useState("")
  const [designationError, setDesignationError] = useState(null)
  const [employmentStartDate, setEmploymentStartDate] = useState(null);
  const [employmentStartDateError, setEmploymentStartDateError] = useState(null);
  const [employmentEndDate, setEmploymentEndDate] = useState(null);
  const [employmentEndDateError, setEmploymentEndDateError] = useState(null);
  const [currentlyWorkingHere, setCurrentlyWorkingHere] = React.useState(false);
  const [documentName, setDocumentName] = useState(null)
  const [documentMimeType, setDocumentMimeType] = useState(null)
  const [documentBase64Content, setDocumentBase64Content] = useState(null)

  function flushData(){
    setExperienceId(null)
    setCompanyName("")
    setCompanyNameError(null)
    setDesignation("")
    setDesignationError(null)
    setEmploymentStartDate(null)
    setEmploymentStartDateError(null)
    setEmploymentEndDate(null)
    setEmploymentEndDateError(null)
    setCurrentlyWorkingHere(false)
    setDocumentMimeType(null)
    setDocumentBase64Content(null)
    setDocumentName(null)
  }

  useEffect(e=>{
    flushData()
    if(props.experience_id !== null && props.experience_id !== ""){
      loadSelectedExperienceData(props.experience_id)
    }
  },[props])

  async function loadSelectedExperienceData(exp_id){
    var response = await get(EMPLOYEE_APIS.FETCH_EMPLOYEE_EXPERIENCE+"?experience_id="+exp_id)
    if(response["status"] === true){
      var data = response["data"][0]
      setExperienceId(props.experience_id)
      setCompanyName(data["office_name"])
      setDesignation(data["designation"])
      setEmploymentStartDate(data["employment_start_date"])
      setEmploymentEndDate(data["employment_end_date"])
      setCurrentlyWorkingHere(data["currently_working_here"])
      setDocumentName(data["document"] === null || data["document"] === undefined ? null : BASE_URL.concat(data["document"]["document_name"]))
      console.log("selected experience data fetched successflly")
    }else{
      setFlashMessage("error","Failed to pull data")
      console.log("Failed to fetch experience data")
    }
  }

  async function validate(){
    let error = false
    if(companyName === null || companyName === ""){
      setCompanyNameError("Office/Company Name cannot be empty")
      error = true
    }else{
      setCompanyNameError(null)
    }
    if(designation === null || designation === ""){
      setDesignationError("Designation cannot be empty")
      error = true
    }else{
      setDesignationError(null)
    }
    if(employmentStartDate === null || employmentStartDate === ""){
      setEmploymentStartDateError("Employment start date cannot be empty")
      error = true
    }else{
      setEmploymentStartDateError(null)
    }
    if((employmentEndDate === null || employmentEndDate === "") && currentlyWorkingHere !== true){
      setEmploymentEndDateError("Employment end date cannot be empty")
      error = true
    }else{
      setEmploymentEndDateError(null)
    }
    return true
  }

  function formatData(date){
    if(date === null || date === "" || date === undefined ){
      return null
    }
    try{
      return date.toISOString().split("T")[0]
    }catch(e){
      return date
    }
  }

  async function loadFileToMemory(event){
    const file = event.target.files[0]
    let base64Val = await toBase64(file)
    setDocumentMimeType(file["type"])
    setDocumentBase64Content(base64Val)
    setDocumentName(file["name"])
  }

  
  async function toBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
  }

  async function uploadDocument(exp_id){
    console.log("*** Uploading DOcuemnt --- ", exp_id)
    if((exp_id !== null && exp_id !== "") && (documentBase64Content !== null && documentBase64Content !== "")){
      var data = {
        document_id: null,
        experience_id: exp_id,
        file_type: CONSTANTS.EMPLOYMENT_LETTER_TYPE,
        is_front_side: true, 
        mime_type: documentMimeType,
        document_description:null,
        base_64_content: documentBase64Content.split("base64,")[1]
      }
      var response = await post(EMPLOYEE_APIS.EMPLOYEE_FILE_UPLOAD, data)
      if(response["status"] === true){
        console.log("Document uploaded successflly")
      }else{
        setFlashMessage("error","Data saved but failed to upload document")
        console.log("Data saved but failed to upload document")
      }
    }else{
      if((documentBase64Content === null || documentBase64Content === "")){
        console.log("No document attached to upload....")
      }else{
        console.log("No Experience ID found to upload document....")
      }
      
    }
  }


  async function save(){
    clearFlashMessage()
    if(! validate()){
      return 
    }
      
    var data = {
      experience_id:props.experience_id === "" ? null : props.experience_id,
      office_name: companyName,
      designation: designation,
      employment_start_date: formatData(employmentStartDate),
      employment_end_date: formatData(employmentEndDate),
      currently_working_here: currentlyWorkingHere
    }
    var response = await post(EMPLOYEE_APIS.UPDATE_EMPLOYEE_EXPERIENCE, data)
    if(response["status"] === true){
      var exp_id = response["data"]["experience_id"]
      setExperienceId(exp_id)
      setFlashMessage("success","Successfully "+(props.experience_id === null ? "added new" : "updated")+" experience")
      await uploadDocument(exp_id)
      flushData()
      props.successCallback()
    }else{
      setFlashMessage("error","Failed to "+(props.experience_id === null ? "add new" : "update")+" experience")
      console.log("Failed to update experience data")
    }
    props.setOpenModal(false)
  }


    return (
        <Dialog open={props.openModal} onClose={e=>{props.setOpenModal(false)}} >
          <DialogTitle > Add Experience</DialogTitle>
          <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <TextField fullWidth variant="outlined" size="medium" 
                label="Office/Company Name yoyo"
                value = {companyName}
                onChange={e=>{setCompanyName(e.target.value)}}
                error={companyNameError !== null}
                helperText={companyNameError}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <TextField fullWidth variant="outlined" size="medium" 
                  label="Designation"
                  value = {designation}
                  onChange={e=>{setDesignation(e.target.value)}}
                  error={designationError !== null}
                  helperText={designationError}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <EmploymentDateInput 
                date={employmentStartDate} 
                setDate={setEmploymentStartDate} 
                error={employmentStartDateError} 
                disabled={false} 
                label={"Employment Start Date"}/>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <EmploymentDateInput 
                date={employmentEndDate} 
                setDate={setEmploymentEndDate} 
                error={employmentEndDateError} 
                disabled={currentlyWorkingHere} 
                label={"Employment End Date"}
                minDate={employmentStartDate}/>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControlLabel
                  control={
                    <Checkbox checked={currentlyWorkingHere} onChange={(e) => { setCurrentlyWorkingHere(!currentlyWorkingHere); }} />
                  }
                  label="Currently Working Here"
                />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Button size="small" color="primary" variant="outlined" component="label">
                  <input hidden accept="*/*" type='file' onChange={(e)=>{loadFileToMemory(e)}}/>
                  <FilePresentIcon/>
                  <span>&nbsp; Upload Supporting Document</span>
              </Button>
            </Grid>
            { documentBase64Content !== null &&
            <Grid item xs={12} md={12} lg={6}>
              <span>{documentName}</span>
              <Button color="secondary" onClick={e=>{setDocumentBase64Content(null); setDocumentMimeType(null)}}><HighlightOffIcon /></Button>
            </Grid>
            }
            { documentBase64Content === null && experienceId !== null && documentName !== null &&
            <Grid item xs={12} md={12} lg={6}>
              <a href={documentName} target="_blank"><span>Employment Document</span></a>
            </Grid>
            }
          </Grid>            
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={e=>{props.setOpenModal(false)}}> Cancel </Button>
            <Button color="primary" onClick={save}> Save </Button>
          </DialogActions>
        </Dialog>
    )
}