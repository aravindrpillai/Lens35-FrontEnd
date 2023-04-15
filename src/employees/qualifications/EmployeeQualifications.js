import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/Content";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EmployeeTheme from "../EmployeeTheme";
import SummaryCard from "../../Components/SummaryCard";
import EmployeeExperienceTable from "./EmployeeExperienceTable";
import ExperienceModal from "./ExperienceModal";
import { Grid } from "@material-ui/core";
import QualificationModal from "./QualificationModal";
import EmployeeQualificationTable from "./EmployeeQualificationTable";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  deleteButton: {
    marginLeft: theme.spacing(1),
  },
}));

export default function EmployeeQualifications() {
  const classes = useStyles();
  const [openExperienceModal, setOpenExperienceModal] = useState(false);
  const [openQualificationModal, setOpenQualificationModal] = useState(false);
  const [loadExperienceData, setLoadExperienceData] = useState(0);
  const [selectedExperienceID, setSelectedExperienceID] = useState(null);

  function experienceSuccessCallBack(){
    console.log("Refreshhh")
    setLoadExperienceData(loadExperienceData+1)
  }
  function QualificationsTitle(){
    return (
      <Toolbar>
        <span>Qualifications</span>
        <div edge="start" className={classes.grow} />
        <Button edge="end" color="primary" variant="contained" startIcon={<AddIcon />} onClick={e=>{setOpenQualificationModal(true)}}  > Add </Button>
      </Toolbar>
    )
  }

  function ExperienceTitle(){
    return (
      <Toolbar>
        <span>Experience</span>
        <div edge="start" className={classes.grow} />
        <Button edge="end" color="primary" variant="contained" startIcon={<AddIcon />} onClick={e=>{setOpenExperienceModal(true)}} > Add </Button>
      </Toolbar>
    )
  }

  function editEmploymentRecord(emp_id){
    setSelectedExperienceID(emp_id)
    setOpenExperienceModal(true)
  }

  return (
    <EmployeeTheme>
      <ExperienceModal openModal={openExperienceModal} setOpenModal={setOpenExperienceModal} experience_id={selectedExperienceID} successCallback={experienceSuccessCallBack}/>
      <QualificationModal openModal={openQualificationModal} setOpenModal={setOpenQualificationModal} />
      <Content> 
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6}>
            <SummaryCard title={<QualificationsTitle/>} value={ <EmployeeQualificationTable /> } />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <SummaryCard title={<ExperienceTitle/>} value={ <EmployeeExperienceTable loadExperienceDate={loadExperienceData} editEmploymentRecord={editEmploymentRecord} /> } />
          </Grid>
        </Grid>
      </Content>
    </EmployeeTheme>
  );
}
