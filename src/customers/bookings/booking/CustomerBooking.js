import React from "react";
import Content from "../../../Components/Content";
import { Button, Grid } from "@material-ui/core";
import CustomerTheme from "./../../CustomerTheme";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import EachFile from "./EachFile";
import { SelectServices } from "./SelectServices";
import { CUSTOMER_APIS } from "../../../util/Properties";
import { get } from "../../../util/Service";


export default function CustomerBooking() {
  
  const { bookingId } = useParams()
  const { clearFlashMessage, setFlashMessage, setLoading } = useContext(AppContext)
  const [files, setFiles] = useState([])
  const [checkedFiles, setCheckedFiles] = useState([])
  const [openServices, setOpenServices] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(e=>{
    clearFlashMessage()
    async function loadFiles(){
      setLoading(true)
      let response = await get(CUSTOMER_APIS.FETCH_UPLOADED_FILES+selectedService.service_id+"/")
      if(response["status"] === true){
          setFiles(response["data"])
      }else{
          setFlashMessage("error","Failed to load files. Please try again")
      }
      setLoading(false)
    }

    if(selectedService !== null){
      loadFiles()
    }
  },[selectedService])

  function handleCheckBoxHandler(){

  }

  function selectedServiceHandler(service){
    setSelectedService(service)
    setOpenServices(false)
  }

  return (
    <CustomerTheme>
      <Content>
        <SelectServices open={openServices} openHandler={setOpenServices} booking_id={bookingId} selectedServiceHandler={selectedServiceHandler}/>                
        <Grid container spacing={2}>
            <Grid item xs={12} >
              <Button variant="outlined" onClick={(e)=>setOpenServices(true)}> 
                {selectedService === null ? "Select Service" : selectedService.service} 
              </Button>
            </Grid>

            {files && files.map((file) => ( 
                <EachFile key={file.file_id} 
                  _file={file}
                  _isChecked ={checkedFiles.includes(file.file_id)}
                  _checkHandler = {handleCheckBoxHandler}
                  />
            ))}

        </Grid>
    </Content>
   </CustomerTheme>
  );
}
