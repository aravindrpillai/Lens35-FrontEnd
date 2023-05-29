import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppContext } from "../contexts/ContextProvider";
import { useContext } from "react";
import ConfirmationModal from "../Components/ConfirmationModal";
import { useState } from "react";

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logo: {
    color: "white",
    textDecoration: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: `#${theme.palette.primary[300].substring(1)}77`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  main_logo:{
    margin: "auto"
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.action.selected,
  },
}));

function CustomerUIFrame(props) {
  const { customerUserName } = useContext(AppContext)
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const isHome = false; // pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logout, setLogout] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  
  function logoutHandler(){
    window.sessionStorage.setItem("Customer-Token", null)
    window.sessionStorage.setItem("Customer-Identifier", null)
    window.sessionStorage.setItem("Customer-Device-Id", null)
    setLogout(false)
    navigate("/")
  }

  /* Modifying the source code from the template example to use the react router pathname hook to set
  selected prop and to use the react router component prop */

  const drawer = (
    <div>
      <div className={classes.toolbar} >
        <br/>
        &nbsp;&nbsp;<img src="/img/logo.png" height="40px" width={"90%"} />
      </div>
      
      <Divider />
      <List>
        {[
          { text: "home", icon: "home" },
          { text: "bookings", icon: "app_shortcut" },
           { text: "profile", icon: "person" },
          { text: "support", icon: "support_agent" }

        ].map(({ text, icon }, index) => (
          <ListItem
            component={RouterLink}
            selected={pathname === `../cust/${text}`}
            to={`../cust/${text}`}
            button
            key={text}
          >
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={text.toUpperCase()} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ConfirmationModal open={logout} openHandler={setLogout} confirmHandler={logoutHandler} title={"Confirm Action"} content={"Thank you for using our services. Remember, we'll be here whenever you're ready to return. Have a fantastic day!" } confirmButtonLabel={"Logout"}/>
      
      <div
        style={{
          height: "64px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "contrast(75%)",
          backgroundImage: "url(/img/wallpaper.jpeg)",
          position: "absolute",
          top: "0px",
          width: "100%",
          zIndex: -2,
        }}
      />
      <AppBar position="sticky" className={isHome ? "" : classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            to={"/"}
            component={RouterLink}
            className={classes.logo}
          >
            {customerUserName}
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Badge overlap="rectangular" color="primary">
          <IconButton onClick={()=>{setLogout(true)}}><ExitToAppIcon  /></IconButton>
          </Badge>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
          >
            <Avatar src="/img/user_imge.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isHome && !mobileOpen ? (
        <div />
      ) : (
        <nav aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open={isHome}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
    </div>
  );
}

CustomerUIFrame.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};

export default CustomerUIFrame;
