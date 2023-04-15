import React from "react";
import { Typography } from '@material-ui/core';
import { Button, Grid, IconButton, makeStyles, Paper, TextField } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { CheckBox } from "@material-ui/icons";
import { Stack } from "@mui/material";
import WebIcon from '@mui/icons-material/Web';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';

const useStyles = makeStyles((theme) => ({
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

export default function PortfolioComponent(){
    const classes = useStyles();
    return (
    <Paper elevation={2} className={classes.summaryCard}>
        <Stack direction="row" spacing={2}  sx={{ justifyContent: "space-between" }} >
          <Typography color={"textSecondary"} >Where can we see your work?</Typography>
          <Button><WebIcon sx={{'color':"#808080"}}/>&nbsp; Add Portfolio</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
              fullWidth error={false}
              label="Porfolio"
              value={"https://facebook.com/aravind.r.pillai"}
              helperText={"Some text"}
          />
           <table><tbody><tr>
              <td><DeleteIcon sx={{'color':"#808080", ':hover': { color: '#338DFF' }}}/></td>
              <td><BorderColorIcon sx={{'color':"#808080", ':hover': { color: '#338DFF' }}}/></td>
              <td><SaveIcon sx={{'color':"#808080", ':hover': { color: '#338DFF' }}}/></td>
            </tr></tbody></table>
        </Stack>
    </Paper>
    )
}