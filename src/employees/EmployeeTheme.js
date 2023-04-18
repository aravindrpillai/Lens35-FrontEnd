import React from "react";
import EmployeeUIFrame from "./EmployeeUIFrame";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AppContext } from "../contexts/ContextProvider";
import { useContext } from "react";

export default function EmployeeTheme( props ) {
  const { loading, setLoading} = useContext(AppContext)
    return (
      <React.Fragment>
        <EmployeeUIFrame />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={e=>{setLoading(false)}} > <CircularProgress color="inherit" /> </Backdrop>
        { props.children }
      </React.Fragment>
    );
  }