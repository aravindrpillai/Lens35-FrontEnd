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
import { get, post } from "../util/Service";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert } from "@mui/material";

function BookingButton(){
  return (
    <Button variant="contained" color="primary" onClick={onClickEvent} style={{float: 'right'}}>Hello</Button>
  )
}

function onClickEvent(){
  console.log("clicked...!!!!")
}

export default function EmployeesHome() {
  
  const navigate = useNavigate()
  const [employeeName, setEmployeeName] = useState("")

  useEffect( (eff) =>{
    async function fetchHomeData(){
      console.log("Inside Home")
      let response = await get(EMPLOYEE_APIS.FETCH_EMPLOYEE_DATA)

      if(response["status"] === true){
        console.log("Success manhnnn")
      }else{
        console.log("Failed")
        //navigate("../emp/login?message="+response["messages"][0]);
      }
    }
    fetchHomeData();
  }, [])

  return (
    <EmployeeTheme>
      
      <Content>
      <Alert onClose={() => {}}>Please complete the registartion <a href="#">here</a> . Your account is still inactive</Alert>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <SummaryCard title={"Welcome"} value={"Somanath Kumar "} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <SummaryCard title={"Upcoming Booking Details"} value={"12th Oct 2022 @ 3pm"} button={<BookingButton />} />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <SummaryCard title="Progress" component={<LineGraph />} />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <SummaryCard title="By Vehicle" component={<PieChart />} />
            </Grid>
          </Grid>
    </Content>
   </EmployeeTheme>
  );
}
