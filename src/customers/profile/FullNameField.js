import React from "react";
import { useContext } from "react";
import Stack from '@mui/material/Stack';
import { post } from "../../util/Service";
import {CUSTOMER_APIS} from "../../util/Properties";
import { AppContext } from "../../contexts/ContextProvider";
import { Button, TextField } from "@material-ui/core";
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';

export default function FullNameField({full_name, setOpenModal, modalCallBackHandler}){
    const [name, setName] = React.useState(full_name === null ? "" : full_name);
    const [nameError, setNameError] = React.useState(null);
    const { clearFlashMessage, setFlashMessage, setCustomerUserName } = useContext(AppContext)
    const [updating, setUpdating] = React.useState(false)
  
    async function save(){
      clearFlashMessage()
      setUpdating(true)
      if(name.length < 3){
        setNameError("Name must be atleast 3 chars in lenght")
        return
      }
      let data = {
        "full_name": name
      }
      let response = await post(CUSTOMER_APIS.UPDATE_CUSTOMER_BASIC_INFO, data)
      if(response["status"] === true){
        setCustomerUserName(name)
        modalCallBackHandler("full_name", name)
        setFlashMessage("success","Name updated successfully")
        setOpenModal(false)
      }else{
        setNameError("Failed to Update")
        console.log("Failed to update Name : ", response["messages"][0])
      }
      setUpdating(false)
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
            <Button variant="outlined" onClick={(e)=>{setOpenModal(false)}} disabled={updating}>
                <DisabledByDefaultTwoToneIcon /> &nbsp; Cancel
            </Button>
            <Button onClick={save} variant="contained" color="primary"  disabled={updating || full_name === name}>
                <CheckBoxTwoToneIcon /> &nbsp; Save</Button>
        </Stack>
       
      </React.Fragment>
    )
  }
  