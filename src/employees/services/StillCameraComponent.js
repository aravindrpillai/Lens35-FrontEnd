import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import { Stack } from "@mui/material";
import PortfolioComponent from "./PortFolioComponent";
import GadgetComponent from "./GadgetComponent";


export default function StillCameraComponent(){
  return (
    <React.Fragment>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }} >
          <Typography color={"textSecondary"} variant="h6">Are you a still photographer <CheckBox /></Typography>
          <Typography color={"textSecondary"} >**This information will be shared with the customer</Typography>
      </Stack>
          

      <Grid container spacing={2}>
        <Grid item xs={6} md={6} lg={6}>
          <GadgetComponent type="stillcamera"/>
        </Grid>
        
        <Grid item xs={6} md={6} lg={6}>
          <PortfolioComponent type="stillcamera" />
        </Grid>
      </Grid>
      
    </React.Fragment>
  )
}