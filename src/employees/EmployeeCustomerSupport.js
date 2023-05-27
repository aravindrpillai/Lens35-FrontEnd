import React from "react";
import Content from "../Components/Content";
import { Grid } from "@material-ui/core";
import EmployeeTheme from "./EmployeeTheme";
import Chat from "../Components/Chat";


export default function EmployeeCustomerSupport() {

  return (
    <EmployeeTheme>
      <Content>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
            <Chat />
            </Grid>
          </Grid>
    </Content>
   </EmployeeTheme>
  );
}
