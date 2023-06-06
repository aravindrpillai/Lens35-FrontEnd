import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import {CUSTOMER_APIS} from "../../util/Properties";
import { post } from "../../util/Service";
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
import { AppContext } from "../../contexts/ContextProvider";


export default function EmailField({email, setOpenModal, modalCallBackHandler}) {
  email = email  === null ? "" : email
  const [value, setValue] = React.useState( email === null || email ==="" ? "" : email);
  const [error, setError] = React.useState(null);
  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
  const [updating, setUpdating] = React.useState(false)

  async function save(){
    clearFlashMessage()
    setUpdating(true)
    if(value === null || value === ""){
      setError("Email cannot be empty")
      return
    }
    let response = await post(CUSTOMER_APIS.UPDATE_CUSTOMER_BASIC_INFO, { "email_id": value })
    if(response["status"] === true){
      modalCallBackHandler("email_id", value)
      setFlashMessage("success","EmailID updated successfully. Please check your email and click on the link shared to verify the email.")
      setOpenModal(false)
    }else{
      setError("Failed: "+response["messages"][0])
      console.log("Failed to update email : ", response["messages"][0])
    }
    setUpdating(false)
  }

  return (
    <React.Fragment>

      <TextField
          fullWidth 
          error={error != null}
          value={value}
          onChange = {(e)=>{setValue(e.target.value)}}
          helperText={error}
        />

      <br/><br/>

      <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={(e)=>{setOpenModal(false)}} disabled={updating} >
              <DisabledByDefaultTwoToneIcon /> &nbsp; Cancel
          </Button>
          <Button onClick={save} variant="contained" color="primary" disabled={updating || email.toUpperCase() === value.toUpperCase()}>
              <CheckBoxTwoToneIcon /> &nbsp; Save</Button>
      </Stack>
     
    </React.Fragment>
  )
}