import React from "react";
import { useContext } from "react";
import Stack from '@mui/material/Stack';
import { post } from "../../util/Service";
import {EMPLOYEE_APIS} from "../../util/Properties";
import { AppContext } from "../../contexts/ContextProvider";
import { Button, TextField } from "@material-ui/core";
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';

export default function FullNameField({full_name, setOpenModal, modalCallBackHandler}){
    const [name, setName] = React.useState(full_name === null ? "" : full_name);
    const [nameError, setNameError] = React.useState(null);
    const { clearFlashMessage, setFlashMessage, setEmployeeUserName } = useContext(AppContext)
  
    async function save(){
      clearFlashMessage()
      if(name.length < 3){
        setNameError("Name must be atleast 3 chars in lenght")
        return
      }
      let data = {
        "full_name": name
      }
      let response = await post(EMPLOYEE_APIS.UPDATE_EMPLOYEE_BASIC_INFO, data)
      if(response["status"] === true){
        setEmployeeUserName(name)
        modalCallBackHandler("full_name", name)
        setFlashMessage("success","Name updated successfully")
        setOpenModal(false)
      }else{
        setNameError("Failed to Update")
        console.log("Failed to update Name : ", response["messages"][0])
      }
    }

    return (
      <React.Fragment>

        <TextField
            fullWidth error={nameError != null}
            label="Full Name"
            value={name}
            onChange = {(e)=>{setName(e.target.value)}}
            helperText={nameError}
          />

        <br/><br/>

        <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={(e)=>{setOpenModal(false)}} >
                <DisabledByDefaultTwoToneIcon /> &nbsp; Cancel
            </Button>
            <Button onClick={save} variant="contained" color="primary"  disabled={full_name === name}>
                <CheckBoxTwoToneIcon /> &nbsp; Save</Button>
        </Stack>
       
      </React.Fragment>
    )
  }
  