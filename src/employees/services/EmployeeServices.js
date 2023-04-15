import React, { useState } from "react";
import Content from "../../Components/Content";
import EmployeeTheme from "../EmployeeTheme";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper, Typography } from "@material-ui/core";
import StillCameraComponent from "./StillCameraComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function EmployeeServices() {
  const [value, setValue] = React.useState(0);

  return (
    <EmployeeTheme>
      <Content>
        <Paper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={(event, newValue) => { setValue(newValue)}} variant="scrollable" scrollButtons="auto">
              <Tab label="Still Photography" />
              <Tab label="Videography" />
              <Tab label="Drone Photography / Videography" />
              <Tab label="Editing" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <StillCameraComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Videography
          </TabPanel>
          <TabPanel value={value} index={2}>
            Drone Photography / Videography
          </TabPanel>
          <TabPanel value={value} index={3}>
            Editing
          </TabPanel>
        </Box>
        </Paper>
      </Content>
    </EmployeeTheme>
  );
}
