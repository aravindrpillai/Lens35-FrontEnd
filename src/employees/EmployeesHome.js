import React from "react";
import Content from "../Components/Content";
import SummaryCard from "../Components/SummaryCard";
import LineGraph from "../Components/LineGraph";
import PieChart from "../Components/PieChart";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import EmployeeTheme from "./EmployeeTheme";
import { useEffect } from "react";
import {EMPLOYEE_APIS} from "../util/Properties";
import { get } from "../util/Service";
import { useNavigate } from "react-router";
import { Alert } from "@mui/material";
import { AppContext } from "../contexts/ContextProvider";
import { useContext } from "react";


export default function EmployeesHome() {
  
  const navigate = useNavigate()
  const { clearFlashMessage, setFlashMessage, employeeUserName, setEmployeeUserName } = useContext(AppContext)

  useEffect( (eff) =>{
    clearFlashMessage()
    async function fetchHomeData(){
      let resp = await get(EMPLOYEE_APIS.FETCH_EMPLOYEE_DATA)
      console.log("--->", resp)
      if(resp["status"] === true){
        const data = resp["data"]
        setEmployeeUserName(data["full_name"])
        if(data["is_draft"] === true ){
          navigate("../emp/profile")
        }
      }else{
        setFlashMessage("error","Failed to load page. "+resp["messages"][0])
      }
      console.log(resp)
    }
    fetchHomeData();
  }, [])


  function BookingButton(){
    return (
      <Button variant="contained" color="primary" onClick={()=>{navigate("/emp/bookings/my")}} style={{float: 'right'}}>Hello</Button>
    )
  }

  return (
    <EmployeeTheme>
      
      <Content>
      <Alert onClose={() => {}}>Please complete the registartion <a href="#">here</a> . Your account is still inactive</Alert>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <SummaryCard title={"Welcome"} value={employeeUserName} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <SummaryCard title={"Upcoming Booking Details"} value={"12th Oct 2022 @ 3pm"} button={<BookingButton />} />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <SummaryCard title="Progress" component={<LineGraph />} />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <SummaryCard title="Booking Stat" component={<PieChart />} />
            </Grid>
          </Grid>
    </Content>
   </EmployeeTheme>
  );
}
