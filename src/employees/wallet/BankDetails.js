import React from "react";
import {TextField} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({disabledTextField: {'& input': { color:'black' }}}));

export default function BankDetails() {
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false);
  const [accountHolder, setAccountHolder] = useState(null)
  const [bank, setBank] = useState(null)
  const [branch, setBranch] = useState(null)
  const [ifsc, setIfsc] = useState(null)
  const [mobile, setMobile] = useState(null)

  return (
    <React.Fragment>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography color={"textSecondary"} variant="h5" gutterBottom> Bank Details</Typography>
          <Button onClick={()=>{setEditMode(!editMode)}} variant={editMode? "contained" : "outlined" } color="primary">{editMode? "Save" : "Edit" }</Button>
        </Stack>
        
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
