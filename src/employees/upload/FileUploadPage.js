import React from "react";
import Content from "../../Components/Content";
import { Grid } from "@material-ui/core";
import EmployeeTheme from "../EmployeeTheme";
import UploadSection from "./UploadSection";


export default function FileUploadPage() {

  return (
    <EmployeeTheme>
      <Content>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <UploadSection />
            </Grid>
          </Grid>
    </Content>
   </EmployeeTheme>
  );
}
