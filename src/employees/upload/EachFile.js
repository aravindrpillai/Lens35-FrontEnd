import React, { useEffect, useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axios, {CancelToken, isCancel} from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CircularProgressWithLabel from '../../Components/CircularProgressWithLabel';
import { EMPLOYEE_APIS } from '../../util/Properties';
import { post } from '../../util/Service';
import ReplayIcon from '@mui/icons-material/Replay';
import { generateUUID4 } from '../../util/UUID';

export default function EachFile({_booking,_service, _key, _file, _successfullyUploadedHandler}) {

    const [uploadPercentage, setUploadPercentage] = useState(0) 
    const [uploadCancelled, setUploadCancelled] = useState(false) 
    const cancelFileUpload = useRef(null)

    useEffect(e=>{
        if(_file !== null && _key !== null && _service !== null){
            handleFileUpload(_key, _file)
        }
    },[_key, _file, _service])

    
    /**
     * Function to get the file URL
     * @param {*} file 
     * @returns 
     */
    function fileURL(file){
        return (file !== null) ? URL.createObjectURL(file) : "#" 
    }

    
    /**
     * Function to handle file upload
     * @param {*} key 
     * @param {*} file 
     * @param {*} service_id 
     * @returns 
     */
    async function handleFileUpload(key_0, file_0){
        if(file_0 === null || file_0 === "") return false
        let file_id = generateUUID4()
        let new_file_name = file_id+"."+file_0.name.split('.').pop()
        let body = {
            "service_id" : _service.service_id,
            "file_name" : new_file_name,
            "mime_type" : (file_0.type !== null && file_0.type !== undefined && file_0.type !== "") ? file_0.type : "application/octet-stream",
            "is_photo" : ['image/jpeg', 'image/png'].includes(file_0.type)
        }
        let uploaded = false
        let response = await post(EMPLOYEE_APIS.GET_FILEUPLOAD_PRESIGNED_URL, body)
        if(response["status"] === true){
            let s3Response = response["data"]
            let s3ConnectionInfo = s3Response["connection_info"]
            let presignedUrl = s3Response["url"]
            
            let uploadedToS3 = await uploadImageUsingPresignedURL(file_0, presignedUrl, s3ConnectionInfo)
            let ack_request = {
                service_id : _service.service_id,
                mime_type : file_0.type,
                file_name : file_0.name,
                file_id : file_id,
                uploaded : true
            }
            let ackResponse = await post(EMPLOYEE_APIS.ACKNODWLEDGE_FILE_UPLOAD, ack_request)
            uploaded = (uploadedToS3 && ackResponse["status"])  
            if(uploaded){
                _successfullyUploadedHandler(ackResponse["data"])
            }       
        }
    }


    
    /**
     * Function to handle the cancel upload
     * @returns 
     */
    function handleFileUploadCancel(){
        if(cancelFileUpload.current){
            cancelFileUpload.current("Upload Cancelled")
        }
    }

  


  

    /**
     * Function to push the file to the S3 repository using presigned url
     * @param {*} file 
     * @param {*} preSignedUrl 
     * @param {*} s3ConnectionInfo 
     * @returns 
     */
    async function uploadImageUsingPresignedURL(file_0, preSignedUrl, s3ConnectionInfo) {
        try{
            setUploadCancelled(false)
            const formData = new FormData();
            Object.keys(s3ConnectionInfo).forEach(key => { formData.append(key, s3ConnectionInfo[key]) });           
            formData.append("file", file_0)
            let resp = await axios.post(preSignedUrl, formData, {
                    headers: { 
                        'Content-Type': "multipart/form-data" 
                    },
                    onUploadProgress: data => {
                        let percentage = Math.round((100 * data.loaded) / data.total)
                        setUploadPercentage(percentage)
                    },
                    cancelToken: new CancelToken(cancel => cancelFileUpload.current = cancel)
                })
            return (resp["status"] >= 200 && resp["status"] < 300)
        }catch(err){
            setUploadPercentage(0)
            console.log("Failed to upload file to repo - ",file_0, err)
            if(isCancel){
                setUploadCancelled(true)
                console.log("File upload is cancelled : ", file_0.name)
            }
            return false
        }
    }




    return (
        <React.Fragment>
       {uploadPercentage < 100 &&
        <Grid item xs={12} md={6} lg={3}  key={_key}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{opacity: 0.4}} component="img" height="140" image={fileURL(_file)}  />
                
                {uploadPercentage < 100 &&
                <CardActions sx={{ justifyContent: "space-between" }} >
                    <span>{_file !== null ? _file.name.split(".")[0] : ""}</span>                    
                    {!uploadCancelled && <CircularProgressWithLabel value={uploadPercentage} />}
                    {uploadCancelled && <font color="red" size="2">Cancelled</font>}
                    
                    {!uploadCancelled && <CancelIcon onClick={handleFileUploadCancel}/>}
                    {uploadCancelled && <ReplayIcon onClick={()=>{handleFileUpload(_key, _file)}}/>}
                </CardActions>
                }
            </Card>
        </Grid>
        }
        </React.Fragment>
    )
}