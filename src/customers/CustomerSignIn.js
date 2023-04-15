import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../Components/Copyright";
import { useNavigate } from "react-router";
import Login from "../Components/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(../img/employee_login_page_bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px"
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));




export function CustomerSignIn() {
  const navigate = useNavigate()
  const classes = useStyles()
 
  function postSuccessfullAuthenticationHandler(){
    navigate("../cust/home")
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container justifyContent="center" className={classes.image}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
          <Grid className={classes.paper}>
            <Avatar className={classes.avatar}> <PhotoCameraIcon /> </Avatar>
            <Typography component="h3" variant="h3"> Lens35 </Typography>
            <Typography component="h5" variant="h5"> Customer Portal </Typography>    
            <br/><br/>
            <Login postSuccessfullAuthenticationHandler = {postSuccessfullAuthenticationHandler} user_type={"customer"} />
            <br/><br/>
            <Box mt={5}> <Copyright /> </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
