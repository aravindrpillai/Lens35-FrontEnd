import * as React from 'react';
import { Button, Card, CardActions, CardMedia, FormControl, MenuItem, Select, Tab } from '@mui/material';
import { post } from '../../util/Service';
import { EMPLOYEE_APIS } from '../../util/Properties';
import { AppContext } from '../../contexts/ContextProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { handleFileUpload } from '../../util/FileUpload';

export default function IDProofs({default_doc_type, default_doc_front_side, default_doc_back_side, modalCallBackHandler, modalHandler }) {

  const { clearFlashMessage } = React.useContext(AppContext)
  const [message, setMessage] = React.useState(null)
  const [uploading, setUploading] = React.useState(false)
  const [frontUploadProgress, setFrontUploadProgress] = React.useState(0)
  const [backUploadProgress, setBackUploadProgress] = React.useState(0)
  const [isFrontSide, setIsFrontSide] = React.useState(true)

  const [documentType, setDocumentType] = React.useState("none")
  const [defaultDocumentFrontSide, setDefaultDocumentFrontSide] = React.useState(null)
  const [defaultDocumentBackSide, setDefaultDocumentBackSide] = React.useState(null)

  const [documentFrontSide, setDocumentFrontSide] = React.useState(null)
  const [documentBackSide, setDocumentBackSide] = React.useState(null)
  const [documentFrontSideFileObject, setDocumentFrontSideFileObject] = React.useState(null)
  const [documentBackSideFileObject, setDocumentBackSideFileObject] = React.useState(null)

  React.useEffect(e=>{
    setDocumentType(default_doc_type === null ? "none" : default_doc_type)
    setDefaultDocumentFrontSide(default_doc_front_side)
    setDefaultDocumentBackSide(default_doc_back_side)
  },[default_doc_type, default_doc_front_side, default_doc_back_side])

  function ImagePlaceholder({side}){
    return (
        <center>
          <Button size="large" variant="contained" component="label">
            <input hidden accept="image/*" multiple={false} type="file" onChange={(e)=>{loadFileToMemory(e, side)}}/>
            <PhotoCameraIcon/>Browse
          </Button>
        </center>
    )
  }

  
  function ImageTag({side}){
    return (
        <Card sx={{ maxWidth: "100%" }}>
            <CardMedia image={side === "front" ? documentFrontSide : documentBackSide} component="img" height="240"></CardMedia>
            <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button size="small" variant="outlined" component="label" onClick={e=>{removeSelectedPicture(side)}}><DeleteIcon/>&nbsp;Remove</Button>
              <Button size="small" variant="contained" component="label">
                <PhotoCameraIcon/>&nbsp;Browse
                <input hidden accept="image/*" multiple={false} type="file" onChange={(e)=>{loadFileToMemory(e, side)}}/>
              </Button>
            </CardActions>
        </Card>
    )
  }

  async function uploadDocument(){
    clearFlashMessage()
    if(!["aadharcard", "passport", "driving_licence", "voters_id"].includes(documentType)){
      setMessage("Please select a document type")
      return
    }
    setUploading(true)
    
    let front_file_name = await handleFileUpload(documentFrontSideFileObject, "id_proof_front", (progress)=>{ setBackUploadProgress(progress) }, true)
    let back_file_name = await handleFileUpload(documentBackSideFileObject, "id_proof_back", (progress)=>{ setFrontUploadProgress(progress) }, true)
    
    if(front_file_name && back_file_name){
      let data = {
        "document_type": documentType,
        "front_file_name": front_file_name,
        "back_file_name": back_file_name
      }

      let response = await post(EMPLOYEE_APIS.UPDATE_EMPLOYEE_ID_PROOF, data)
      console.log(response);
      if(response["status"] === true){
        modalCallBackHandler("id_proof_type", documentType)
        setMessage("ID Proof updated successfully")
      }else{
        setMessage("Failed to update ID Proof.")
        console.log("Failed to update document type. ", response["messages"][0])
      }  
    }else{
      setMessage("Failed to update ID Proof.")
    }
    setUploading(false)
    return
  }

  function removeSelectedPicture(side){
    if(side === "front"){
      setDocumentFrontSide(null)
      setDocumentFrontSideFileObject(null)
    }else{
      setDocumentBackSide(null)
      setDocumentBackSideFileObject(null)
    }
  }

  function loadFileToMemory(e, side){
    if(e.target.files.length <= 0){
      console.log("NO FILES SELECTED... EXITING")
      return 
    }
    
    let file = e.target.files[0]
    if(side === "front"){
      setDocumentFrontSide(URL.createObjectURL(file))
      setDocumentFrontSideFileObject(file)
      setFrontUploadProgress(0)
      setBackUploadProgress(0)
    }else{
      setDocumentBackSide(URL.createObjectURL(file))
      setDocumentBackSideFileObject(file)
      setFrontUploadProgress(0)
      setBackUploadProgress(0)
    }
  }



  return (
    <React.Fragment>
      <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }} >
        <Select error={documentType === "none"} defaultValue={"none"} value={documentType} onChange={(e)=>{setDocumentType(e.target.value)}} label="Select Proof" >
          <MenuItem value={"none"}>Select Proof</MenuItem>
          <MenuItem value={"aadharcard"}>Aadhar Card</MenuItem>
          <MenuItem value={"passport"}>Passport</MenuItem>
          <MenuItem value={"driving_licence"}>Driving License</MenuItem>
          <MenuItem value={"voters_id"}>Voters ID</MenuItem>
        </Select>
      </FormControl>

    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={isFrontSide ? '1' : '2'}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(e, v) => { setIsFrontSide(v === '1') }} >
            <Tab label="Front Page" value="1" />
            <Tab label="Back Page" value="2" />
          </TabList>
        </Box>


        <TabPanel value="1">
            {documentFrontSide === null && defaultDocumentFrontSide === null && <ImagePlaceholder side={"front"}/> }
            
            {defaultDocumentFrontSide !== null && documentFrontSide === null &&
              <Card sx={{ maxWidth: "100%" }}>
                <CardMedia component="img" height="100%" image={defaultDocumentFrontSide}/>
                <CardActions>
                  <Button size="small" variant="contained" component="label">
                    <PhotoCameraIcon/>Update <input hidden multiple={false} accept="image/*" type="file" onChange={(e)=>{loadFileToMemory(e, "front")}}/>
                  </Button>
                </CardActions>
              </Card>
            }
            { documentFrontSide !== null && <ImageTag side={"front"}/> }
        </TabPanel>


        <TabPanel value="2">
          {documentBackSide === null && defaultDocumentBackSide === null && <ImagePlaceholder side={"back"}/> }
            
          {defaultDocumentBackSide !== null && documentBackSide === null && 
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia component="img" height="100%" image={defaultDocumentBackSide}/>
              <CardActions>
                <Button size="small" variant="contained" component="label">
                  <PhotoCameraIcon/>Update <input hidden multiple={false} accept="image/*" type="file" onChange={(e)=>{loadFileToMemory(e, "back")}}/>
                </Button>
              </CardActions>
            </Card>
          }
          { documentBackSide !== null && <ImageTag side={"back"}/> }
        </TabPanel>

        <center>
          {frontUploadProgress+backUploadProgress > 0 &&
          <span><center>Uploading : {((frontUploadProgress+backUploadProgress)/2)}%</center></span>
          }
          <span><center>{message}</center></span>

              <br/>
              <Button disabled={(!((documentType !== "none" && documentFrontSide !== null && documentBackSide !== null))) || (frontUploadProgress+backUploadProgress > 0)} size="large" variant="outlined" component="label" onClick={e=>{uploadDocument()}}><SaveIcon/>&nbsp;Save</Button>
              <Button disabled={uploading} size="large" variant="outlined" component="label" onClick={e=>{modalHandler(false)}}><SaveIcon/>&nbsp;Close</Button>
            </center>
        
      </TabContext>
    </Box>



    </React.Fragment>
  );
}
