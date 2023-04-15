import React, { useState } from "react";
import dayjs from 'dayjs';
import Button from "@material-ui/core/Button";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import EmploymentDateInput from "./EmploymentDateInput";
import Checkbox from '@mui/material/Checkbox';
import FilePresentIcon from '@mui/icons-material/FilePresent';

export default function QualificationModal({openModal, setOpenModal}){

  const [courseCompletionYear, setCourseCompletionYear] = useState(dayjs(new Date()));
  const [courseCompletionYearError, setCourseCompletionYearError] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState(null);
  const [courseOnGoing, setCourseOnGoing] = React.useState(false);


  function validate(){
    setCourseCompletionYearError(null);
    setCourseNameError(null);
    let error = false;
    if((courseCompletionYear === null || courseCompletionYear === "") && (courseOnGoing === false)){
      error = true;
      setCourseCompletionYearError("Couse completion year error cannot be empty");
    }else{
      let dt = courseCompletionYear.toDate()

      let completionYear = dt.getFullYear()
      let completionMonth = dt.getMonth()
      let currentYear = new Date().getFullYear()
      let currentMonth = new Date().getMonth()
      if(completionYear < 1960 || completionYear > (currentYear+1)){
        error = true;
        setCourseCompletionYearError("Couse completion year must be between 1960 and current year");
      }else{
        if((completionYear === currentYear) && (completionMonth > currentMonth)){
          error = true;
          setCourseCompletionYearError("Couse completion month must be before current month");
        }
      }
    }

    if(courseName === null || courseName === ""){
      error = true;
      setCourseNameError("Couse name error cannot be empty");
    }

    return error;
  }

  function save(){
    if(! validate()){
      console.log("voila ... all good... ")
    }else{
      console.log("oh boy.. u got errors... ")
    }
  }

  return (
      <Dialog open={openModal} onClose={e=>{setOpenModal(false)}} >
        <DialogTitle > Add Qualification</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField fullWidth variant="outlined" size="medium" 
              label="Course Name"
              error={courseNameError !== null}
              value = {courseName}
              onChange={e=>{setCourseName(e.target.value)}}
              helperText={courseNameError}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <FormControl fullWidth variant="outlined" size="medium" >
              <InputLabel>University</InputLabel>
              <Select label="University" error={true}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText><font color="red">Some teXt</font></FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <EmploymentDateInput 
              date={courseCompletionYear} 
              setDate={setCourseCompletionYear} 
              error={courseCompletionYearError !== null} 
              helperText={courseCompletionYearError}
              disabled={courseOnGoing} 
              label={"Course completion date"}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <FormControlLabel
                control={
                  <Checkbox checked={courseOnGoing} onChange={(e) => { setCourseOnGoing(!courseOnGoing); }} />
                }
                label="Course On Going"
              />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Button size="small" color="primary" variant="outlined" component="label">
                <input hidden accept="*/*" type='file' onChange={(e)=>{console.log("upload")}}/>
                <FilePresentIcon/>
                <span>&nbsp; Upload Supporting Document</span>
            </Button>
          </Grid>
        </Grid>            
        </DialogContent>
        <DialogActions>
          <Button color="primary"> Cancel </Button>
          <Button color="primary" onClick={e=>save()}> Save </Button>
        </DialogActions>
      </Dialog>
  )
}