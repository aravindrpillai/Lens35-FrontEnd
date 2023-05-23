import React from "react";
import Content from "../../Components/Content";
import { Grid, Tooltip } from "@material-ui/core";
import { Button } from "@material-ui/core";
import EmployeeTheme from "./../EmployeeTheme";
import { Stack } from "@mui/material";
import { AppContext } from "../../contexts/ContextProvider";
import { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Transactions from "./Transactions";
import BankDetails from "./BankDetails";

const useStyles = makeStyles((theme) => ({
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

export default function EmployeesWallet() {
  const classes = useStyles();
  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)

  return (
    <EmployeeTheme>
      
      <Content>
          <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={6}>
              <Paper elevation={2} className={classes.summaryCard}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Tooltip title="Current balance in your wallet" arrow>
                    <Typography color={"textSecondary"} variant="h5" gutterBottom> Wallet Balance</Typography>
                  </Tooltip>
                  <Button variant="outlined" color="primary">Transfer To Bank</Button>
                </Stack>
                <Tooltip title="Current balance in your wallet" arrow>
                  <Typography color={"primary"} variant="h3"> Rs.7,859/- </Typography>
                </Tooltip>
                <Tooltip title="This is the amount which you will be receiving for the recently closed bookings" arrow>
                  <Typography color={"secondary"} variant="h6"> Booking Balance : Rs.3,212/- </Typography>
                </Tooltip>
                
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper elevation={2} className={classes.summaryCard}>
                <Tooltip title="Your total earnings" arrow>
                  <Typography color={"textSecondary"} variant="h5" gutterBottom> Total Earnings </Typography>
                </Tooltip>
                <Tooltip title="Your total earnings" arrow>
                  <Typography color={"primary"} variant="h3">Rs.2,85,859/-</Typography>
                </Tooltip>
                <Tooltip title="Amount you have transferred to your bank account" arrow>
                  <Typography color={"secondary"} variant="h6"> Total Transferred : Rs.1,42,786/- </Typography>
                </Tooltip>
              </Paper>
            </Grid>



            <Grid item xs={12} md={12} lg={8}>
              <Paper elevation={2} className={classes.summaryCard}>
                <Transactions/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              <Paper elevation={2} className={classes.summaryCard}>
                <BankDetails />
              </Paper>
            </Grid>

          </Grid>
    </Content>
   </EmployeeTheme>
  );
}
