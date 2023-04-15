import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { AppContext } from "../contexts/ContextProvider";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    position: "relative",
  },
}));

export default function Content({ children }) {
  const classes = useStyles();
  const { message, messageType, clearFlashMessage } = useContext(AppContext)
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
        
        <Collapse in={message!=null}>
        <Alert sx={{ mb: 2 }} severity={messageType}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={ clearFlashMessage } >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        > {message} </Alert>
        </Collapse>
          {children}
        </Container>
      </main>
    </div>
  );
}
