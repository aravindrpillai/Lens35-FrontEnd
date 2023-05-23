import React from "react";
import {TextField} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useEffect } from "react";
import { EMPLOYEE_APIS } from "../../util/Properties";
import {get, post} from "../../util/Service"
import CustomAlert from "../../Components/CustomAlert";

const useStyles = makeStyles((theme) => ({disabledTextField: {'& input': { color:'black' }}}));

export default function BankDetails() {
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false);
  const [accountHolder, setAccountHolder] = useState("")
  const [bank, setBank] = useState("")
  const [branch, setBranch] = useState("")
  const [ifsc, setIfsc] = useState("")
  const [mobile, setMobile] = useState("")
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(e=>{
    async function fetchBankInfo(){
      setMessage(null)
      let response = await get(EMPLOYEE_APIS.WALLET_FETCH_BANK_INFO)
      console.log("BANK INFO FETCH --> ",response)
      if(response["status"] === true){
        let data = response["data"]
        setAccountHolder(data.account_holder !== null ? data.account_holder : "")
        setBank(data.bank !== null ? data.bank : "")
        setBranch(data.branch !== null ? data.branch : "")
        setIfsc(data.ifsc !== null ? data.ifsc : "")
        setMobile(data.mobile_number !== null ? data.mobile_number : "")
      }else{
        setMessageType("error")
        setMessage("Failed to fetch bank info. : ", response["messages"][0])
        console.log("Failed to fetch bank info. : ", response["messages"][0])
      }
    }
    fetchBankInfo()
  },[])


  async function handleEditClick(){
    if(editMode){
      setMessage(null)
      let body = {
        "bank": bank,
        "branch": branch,
        "ifsc": ifsc,
        "account_holder": accountHolder,
        "mobile_number": mobile
      }
      let response = await post(EMPLOYEE_APIS.WALLET_UPDATE_BANK_INFO, body)
      if(response["status"] === true){
        setMessageType("success")
        setMessage("Successfully updated your bank datails.")
        setEditMode(!editMode)
      }else{
        setMessageType("error")
        setMessage("Failed to update bank info. "+ response["messages"][0])
        console.log("Failed to update bank info. : ", response["messages"][0])
      }
    }else{
      setEditMode(!editMode)
    }
    
  }

  return (
    <React.Fragment>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography color={"textSecondary"} variant="h5" gutterBottom> Bank Details</Typography>
          <Button onClick={handleEditClick} variant={editMode? "contained" : "outlined" } color="primary">{editMode? "Save" : "Edit" }</Button>
        </Stack>
        {message !== null &&
        <CustomAlert messageType={messageType} message={message}/>
        }
        <React.Fragment>
          <br/>
          <TextField
            label="Account Holder Name"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            disabled = {!editMode}
            fullWidth margin="none"
            variant={editMode ? "outlined" : "standard"} 
            className={!editMode ? classes.disabledTextField : ''}
          />
          <br/> <br/>
          <TextField
            label="Bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            disabled = {!editMode}
            fullWidth margin="none"
            variant={editMode ? "outlined" : "standard"} 
            className={!editMode ? classes.disabledTextField : ''}
          />

          <br/> <br/>
          <TextField
            label="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            disabled = {!editMode}
            fullWidth margin="none"
            variant={editMode ? "outlined" : "standard"} 
            className={!editMode ? classes.disabledTextField : ''}
          />

          <br/> <br/>
          <TextField
            label="IFSC"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            disabled = {!editMode}
            fullWidth margin="none"
            variant={editMode ? "outlined" : "standard"} 
            className={!editMode ? classes.disabledTextField : ''}
          />

          <br/> <br/>
          <TextField
            label="Recipient Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled = {!editMode}
            fullWidth margin="none"
            variant={editMode ? "outlined" : "standard"} 
            className={!editMode ? classes.disabledTextField : ''}
          />
        </React.Fragment>
    </React.Fragment> 
  )
}
