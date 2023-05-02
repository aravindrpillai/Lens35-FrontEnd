import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Stack } from "@mui/material";
import { Button, Checkbox, Grid } from "@material-ui/core";
import { EMPLOYEE_APIS } from "../../util/Properties";
import { AppContext } from "../../contexts/ContextProvider";
import { post } from "../../util/Service";

const useStyles = makeStyles((theme) => ({
    summaryCard: {
      margin: theme.spacing(1),
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  }));


  
export default function ServicesComponent({is_photographer, is_videographer, is_drone_photographer, is_photo_editor, is_video_editor}) {

    const classes = useStyles();
    const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
    const [selectAll, setSelectAll] = useState(false)
    const [photographer, setPhotographer] = useState(false)
    const [videographer, setVideographer] = useState(false)
    const [dronePhotographer, setDronePhotographer] = useState(false)
    const [photoEditor, setPhotoEditor] = useState(false)
    const [videoEditor, setVideoEditor] = useState(false)

    useEffect(e=>{
        setPhotographer(is_photographer)
        setVideographer(is_videographer)
        setDronePhotographer(is_drone_photographer)
        setPhotoEditor(is_photo_editor)
        setVideoEditor(is_video_editor)
        let selAll = false
        if(is_photographer !== undefined && is_videographer !== undefined && is_drone_photographer !== undefined && is_photo_editor !== undefined && is_video_editor !== undefined){
            selAll = (is_photographer && is_videographer && is_drone_photographer && is_photo_editor && is_video_editor)
        }
        setSelectAll(selAll)
    },[is_photographer, is_videographer, is_drone_photographer, is_photo_editor, is_video_editor])

    function handleServiceSelection(service){
        if(service === "photographer"){
            setPhotographer(!photographer)
            setSelectAll((!photographer) && videographer && dronePhotographer && photoEditor && videoEditor)
        }
        if(service === "videographer"){
            setVideographer(!videographer)
            setSelectAll(photographer && (!videographer) && dronePhotographer && photoEditor && videoEditor)
        }
        if(service === "drone_photographer"){
            setDronePhotographer(!dronePhotographer)
            setSelectAll(photographer && videographer && (!dronePhotographer) && photoEditor && videoEditor)
        }
        if(service === "photo_editor"){
            setPhotoEditor(!photoEditor)
            setSelectAll(photographer && videographer && dronePhotographer && (!photoEditor) && videoEditor)
        }
        if(service === "video_editor"){
            setVideoEditor(!videoEditor)
            setSelectAll(photographer && videographer && dronePhotographer && photoEditor && (!videoEditor))
        }
        
    }

    function revertChanges(){
        setPhotographer(is_photographer)
        setVideographer(is_videographer)
        setDronePhotographer(is_drone_photographer)
        setPhotoEditor(is_photo_editor)
        setVideoEditor(is_video_editor)
    }


    async function saveServices(){
        clearFlashMessage()
        let data = {
            "is_photographer" : photographer,
            "is_videographer" : videographer,
            "is_drone_photographer" : dronePhotographer,
            "is_photo_editor" : photoEditor,
            "is_video_editor" : videoEditor
        }
        let response = await post(EMPLOYEE_APIS.UPDATE_EMPLOYEE_SERVICES, data)
        if(response["status"] === true){
            setFlashMessage("success", "Services updated successfully")
        }else {
            setFlashMessage("error", "Failed to update services") 
            console.log(response["messages"][0])
        }
    }
    return (
      <Paper elevation={2} className={classes.summaryCard}>
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            
            <Typography color={"textSecondary"} variant="h5" gutterBottom> Services &nbsp;&nbsp; <Checkbox 
                onClick={e=>{
                    setPhotographer(!selectAll)
                    setVideographer(!selectAll)
                    setDronePhotographer(!selectAll)
                    setPhotoEditor(!selectAll)
                    setVideoEditor(!selectAll) 
                    setSelectAll(!selectAll)
                }}
                checked = {selectAll}
            /><font size="2">{selectAll ? "Unselect All" : "Select All"} </font></Typography>    
        </Stack>
        {
            (photographer === false && videographer === false && dronePhotographer === false && videoEditor === false && photoEditor === false) && 
            <Typography color={"textSecondary"} variant="h6" gutterBottom> <font size="2">Atleast one service must be selected </font></Typography>
        }
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={2}>  <Typography><Checkbox onChange={e=>{handleServiceSelection("photographer")}} checked={photographer===undefined ? false : photographer}/>Still Photography</Typography> </Grid>
            <Grid item xs={12} md={6} lg={2}>  <Typography><Checkbox onChange={e=>{handleServiceSelection("videographer")}} checked={videographer===undefined ? false : videographer} />Videography</Typography> </Grid>
            <Grid item xs={12} md={6} lg={2}>  <Typography><Checkbox onChange={e=>{handleServiceSelection("drone_photographer")}} checked={dronePhotographer===undefined ? false : dronePhotographer} />Drone Shoot</Typography> </Grid>
            <Grid item xs={12} md={6} lg={2}>  <Typography><Checkbox onChange={e=>{handleServiceSelection("photo_editor")}} checked={photoEditor===undefined ? false : photoEditor} />Photo Editing</Typography> </Grid>
            <Grid item xs={12} md={6} lg={2}>  <Typography><Checkbox onChange={e=>{handleServiceSelection("video_editor")}} checked={videoEditor===undefined ? false : videoEditor} />Video Editing</Typography> </Grid>
            <Grid item xs={12} md={6} lg={2}>  
                {(photographer !== is_photographer || videographer !== is_videographer || dronePhotographer !== is_drone_photographer || videoEditor !== is_video_editor || photoEditor !== is_photo_editor) && 
                    <Stack direction={"row"} spacing={2} justifyContent={"space-evenly"}>
                        <Button variant="outlined" onClick={saveServices}>Save</Button> 
                        <Button variant="outlined" onClick={revertChanges}>Cancel</Button> 
                    </Stack>
                }
            </Grid>
        </Grid>
      </Paper>
    );
  }