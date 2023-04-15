
import React from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Button, FormHelperText } from '@mui/material';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
import Stack from '@mui/material/Stack';
import { post } from "../../util/Service";
import {EMPLOYEE_APIS} from "../../util/Properties";
import { AppContext } from "../../contexts/ContextProvider";
import { useContext } from "react";


export default function DateOfBirthField({dob, setOpenModal, loadData}) {
  const [value, setValue] = React.useState( dayjs(dob === null || dob ==="" ? new Date() : dob) );
  const [error, setError] = React.useState(null);
  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)

  async function save(){
    clearFlashMessage()
    if(value === null || value === ""){
      setError("Date of birth cannot be empty")
      return
    }
    let response = await post(EMPLOYEE_APIS.UPDATE_EMPLOYEE_DATA, { "date_of_birth": value.toISOString().split("T")[0] })
    if(response["status"] === true){
      loadData()
      setFlashMessage("success","Date Of Birth updated successfully")
      setOpenModal(false)
    }else{
      setError("Failed to Update")
      console.log("Failed to update date of birth : ", response["message"][0])
    }
  }


  return (
    <React.Fragment>
      <br/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={(newValue) => { setValue(newValue)}}
            renderInput={(params) => <TextField {...params} />}
          />
      </LocalizationProvider>
      {error && <FormHelperText><font color="red">{error}</font></FormHelperText>}
      <br/><br/>

        <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={(e)=>{setOpenModal(false)}} >
                <DisabledByDefaultTwoToneIcon /> &nbsp; Cancel
            </Button>
            <Button onClick={save} variant="contained" color="primary" disabled={dob === value}>
              <CheckBoxTwoToneIcon /> &nbsp; Save
            </Button>
        </Stack>
       
    </React.Fragment>
  );
}
