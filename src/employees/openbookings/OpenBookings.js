import React from "react";
import Content from "../../Components/Content";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import EmployeeTheme from "./../EmployeeTheme";
import PriorityRequests from "./PriorityRequests";
import GeneralRequests from "./GeneralRequests";

const useStyles = makeStyles((theme) => ({summaryCard: { margin: theme.spacing(1), flexGrow: 1, padding: theme.spacing(3) }}))

export default function OpenBookings() {
  const classes = useStyles()
  

  return (
    <EmployeeTheme>
    <Content>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6}>
            <Paper elevation={2} className={classes.summaryCard}>
              <Typography color={"primary"} variant="h5" gutterBottom>Priority Bookings</Typography>
              <PriorityRequests />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Paper elevation={2} className={classes.summaryCard}>
              <Typography color={"primary"} variant="h5" gutterBottom>Open Bookings</Typography>
              <GeneralRequests />
            </Paper>
          </Grid>
          
        </Grid>
   </Content>
   </EmployeeTheme>
  );
}
