import React from "react";
import Content from "../Components/Content";
import ExpensesTable from "../Components/ExpensesTable";
import SummaryCard from "../Components/SummaryCard";
import { Grid } from "@material-ui/core";
import EmployeeTheme from "./EmployeeTheme";


export default function EmployeeNewBooking() {

  return (
    <EmployeeTheme>
    <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <SummaryCard title={"New Bookings"} component={<ExpensesTable />} />
          </Grid>
        </Grid>
   </Content>
   </EmployeeTheme>
  );
}
