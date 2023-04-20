import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from "../contexts/ContextProvider";
import { useContext } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
}))

export default function Content({ children }) {
  const classes = useStyles()
  const { loading, setLoading, message, messageType, clearFlashMessage } = useContext(AppContext)
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
        <Collapse in={message!=null}>
          <Alert sx={{ mb: 2 }} severity={messageType} action={<IconButton aria-label="close" color="inherit" size="small" onClick={ clearFlashMessage } > <CloseIcon fontSize="inherit" /> </IconButton>}> 
            {message} 
          </Alert>
        </Collapse>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={e=>{setLoading(false)}} > <CircularProgress color="inherit" /> </Backdrop>        
          {children}
        </Container>
      </main>
    </div>
  )
}
