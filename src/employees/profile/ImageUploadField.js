import { Button, Card, CardMedia, CircularProgress, IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import Stack from '@mui/material/Stack';
import { PhotoCamera } from "@material-ui/icons";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BackupIcon from '@mui/icons-material/Backup';
import { useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { post } from "../../util/Service";
import {EMPLOYEE_APIS} from "../../util/Properties";
import { AppContext } from "../../contexts/ContextProvider";
import { useContext } from "react";
import { handleFileUpload } from "../../util/FileUpload";
import Resizer from "react-image-file-resizer";

function ImageTag({data}){
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia image={data} component="img" height="240"></CardMedia>
        </Card>
    )
}

export default function ImageUpload({image_from_server}){
    const [uploading, setUploading] = useState(false)
    const { clearFlashMessage, setFlashMessage } = useContext(AppContext)

    
    const [imageFromServer, setImageFromServer] = useState(null)
    const [imageObject, setImageObject] = useState(null)
    const [imageToPreview, setImageToPreview] = useState(null)


    useEffect(e=>{
        setImageFromServer(image_from_server)
    },[image_from_server])

    function ModifyImageButton(){
        return (
            <Button size="small" color="primary" variant="outlined" component="label">
                <input hidden accept="image/*" multiple={false} type='file' onChange={(e)=>{previewFile(e.target.files)}}/>
                <CameraAltIcon/>
                <span>&nbsp; Change</span>
            </Button>
        )
    }

    function UploadImageButton(){
        return (
            <Button size="small" color="primary" variant="outlined" component="label" onClick={uploadFile} disabled={uploading}>
                {
                uploading &&
                <React.Fragment>
                    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}} />
                    <span>&nbsp; Uploading</span>
                </React.Fragment>
                }
                {
                !uploading &&
                <React.Fragment>
                    <BackupIcon/>
                    <span>&nbsp; Upload</span>
                </React.Fragment>
                }
            </Button>
        )
    }

    function RemoveImageButton(){
        return (
            <Button size="small" color="primary" variant="outlined" component="label" onClick={clearSelectedImage} disabled={uploading}>
                <HighlightOffIcon/>
            </Button>
        )
    }

    function ImagePlaceholder(){
        return (
            <IconButton color="primary" component="label" size="small">
                <input hidden accept="image/*" multiple={false} type='file' onChange={(e)=>{previewFile(e.target.files)}}/>
                <PhotoCamera size="small"/>
                <span>&nbsp; Select Image</span>
            </IconButton>
        )
    }



    async function resizeFile(file){
        let compressionPercetage = 100
        return await new Promise((resolve) => {
            //PARAMETERS -- file, maxWidth, maxHeight, compressFormat, qualityNumber, rotation, responseUriFunc, outputType = [base64|blob|file]
            Resizer.imageFileResizer(file, 300 ,300,"JPEG",compressionPercetage,0,(uri) => { resolve(uri); },"file" );
        })
    }

    function clearSelectedImage(){
        setImageObject(null)
        setImageToPreview(null)
    }

    async function previewFile(files){
        if(files.length > 0){
            let file = files[0]
            setImageObject(file)
            setImageToPreview(URL.createObjectURL(file))
        }else{
            setImageObject(null)
            setImageToPreview(imageFromServer)
        }
    }

    async function uploadFile(){
        clearFlashMessage()
        if(imageObject === null){
            console.log("No image selected to upload")
            return
        }
        setUploading(true)
        const file = await resizeFile(imageObject);
        let dp_file_name = await handleFileUpload(file, "display_picture", (progress)=>{ console.log("Progress : ", progress) }, true)
        
        if(dp_file_name !== false){
            let response = await post(EMPLOYEE_APIS.UPDATE_EMPLOYEE_DP,{ "file_name": dp_file_name })
            if(response["status"] === true){
                setFlashMessage("success","Name updated successfully")
                let new_dp_url = response["data"]["link"]
                console.log("New URL : ", new_dp_url)
                setImageFromServer(new_dp_url)
                setFlashMessage("success","Profile picture updated successfully")
            }else{
                setFlashMessage("error","Failed to update profile picture")
                console.log("Failed to update Name : ", response["message"][0])
            }
        }
        clearSelectedImage()
        setUploading(false)
    }


 

  return (
      <React.Fragment>
        <center>
            <Card variant="outlined" id="image_div" height="140">
                {
                    (imageFromServer !== null && imageToPreview === null) && 
                    <ImageTag data={imageFromServer} />
                }
                {
                    (imageToPreview !== null) && 
                    <ImageTag data={imageToPreview} />
                }
                {
                    ((imageToPreview === null || imageToPreview === "") && (imageFromServer === null || imageFromServer === "")) && 
                    <ImagePlaceholder />
                }
            </Card>
        </center>
        <br/>
        
        <Stack direction="row" spacing={2} id="button_stack_div">
            {
                (imageFromServer !== null && imageToPreview === null) && 
                <ModifyImageButton/>
                
            }
            {
                (imageToPreview !== null) && 
                <React.Fragment> 
                    <RemoveImageButton />
                    <ModifyImageButton />       
                    <UploadImageButton />  
                </React.Fragment>
            }
        </Stack>
        
      </React.Fragment>
  )

}