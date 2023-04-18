import React from "react";
import CustomerUIFrame from "./CustomerUIFrame";
import { AppContext } from "../contexts/ContextProvider";
import { useContext } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomerTheme( props ) {
  
  const { loading, setLoading} = useContext(AppContext)

    return (
      <React.Fragment>
        <CustomerUIFrame/>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={e=>{setLoading(false)}} > <CircularProgress color="inherit" /> </Backdrop>
        { props.children }
      </React.Fragment>
    );
  }