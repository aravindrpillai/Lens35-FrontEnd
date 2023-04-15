
import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    summaryCard: {
      margin: theme.spacing(1),
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  }));

  
export default function SummaryCard({ title, value, component, button }) {
    const classes = useStyles();
    return (
      <Paper elevation={2} className={classes.summaryCard}>
        <Typography color={"textSecondary"} variant="h5" gutterBottom>
          {title} {button}
        </Typography>
        {component || (
          <Typography color={"primary"} variant="h3">
            {value}
          </Typography>
        )}
      </Paper>
    );
  }