import React, { useEffect } from "react";
import { Button, Grid, IconButton, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from "@mui/material";
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

export default function GadgetComponent({type}){
    const classes = useStyles();


    useEffect(e=>{

    },[])


    return (
      <Paper elevation={2} className={classes.summaryCard}>
        <Stack direction="row" spacing={2}  sx={{ justifyContent: "space-between" }} >
          <Typography color={"textSecondary"} > Add your camera details</Typography>
          <Button ><CameraEnhanceIcon sx={{'color':"#808080"}}/>&nbsp; Add Camera</Button>
        </Stack>
        
        <Grid item xs={12} md={12} lg={12}>
          <Stack direction="row" spacing={2}>
            <TextField
                fullWidth error={false}
                label="Camera Name"
                value={"Canon"}
                helperText={"Some text"}
            />
            <TextField
                fullWidth error={false}
                label="Camera Model"
                value={"Mark 5D"}
                helperText={"Some text"}
            />
            <table><tbody><tr>
              <td><DeleteIcon sx={{'color':"#808080", ':hover': { color: '#338DFF' }}}/></td>
              <td><BorderColorIcon sx={{'color':"#808080", ':hover': { color: '#338DFF' }}}/></td>
              <td><SaveIcon sx={{'color':"#808080", ':hover': { color: '#338DFF' }}}/></td>
            </tr></tbody></table>
          </Stack>
        </Grid>
      </Paper>
    )
}