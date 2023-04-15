import { post } from './Service';
import { EMPLOYEE_APIS, FILES_API } from './Properties';
import axios, {CancelToken, isCancel} from 'axios';

/**
 * Function to handke the entire file upload
 * @param {*} file 
 * @param {*} serviceId 
 * @returns 
 */
 async function handleFileEmployeeSpecificUpload(file, file_type, progressCallBack){
    if(file === null || file === "") return false
    let body = {
        "document_type": file_type, //display_picture or id_prood
        "mime_type" : getFileMimeType(file)
    }
    console.log("Uploading Employee DP", file)
    let response = await post(EMPLOYEE_APIS.GET_PRESIGNED_URL_FOR_EMPLOYEE_FILE_UPLOAD, body)
    
    
    console.log("Presigned URL FOR DP response: ", response)
    if(response["status"] === true){
        let s3Response = response["data"]
        let s3ConnectionInfo = s3Response["connection_info"]
        let presignedUrl = s3Response["url"]
        let file_name = s3Response["file_name"]
        await uploadImageUsingPresignedURL(file, presignedUrl, s3ConnectionInfo, progressCallBack)
        return file_name
    }else 
        return false
}

/**
 * Function to handke the entire file upload
 * @param {*} file 
 * @param {*} serviceId 
 * @returns 
 */
 async function handleFileUploadForService(file, serviceId, progressCallBack, cancelFileUpload){
    if(file === null || file === ""){ 
        console.log("Empty file... aaaa")
        return false
    }

    let body = {
        "service_id" : serviceId,
        "file_name" : file.name,
        "mime_type" : getFileMimeType(file),
        "is_photo" : checkIfPhoto(file)
    }
    let uploadedToS3 = false
    let response = await post(FILES_API.GET_FILEUPLOAD_PRESIGNED_URL, body)
    if(response["status"] === true){
        let s3Response = response["data"]
        let s3ConnectionInfo = s3Response["connection_info"]
        let presignedUrl = s3Response["url"]
        uploadedToS3 = await uploadImageUsingPresignedURL(file, presignedUrl, s3ConnectionInfo, progressCallBack, cancelFileUpload)
    }else 
        return false
  
    //Send Acknodwledge
    //the final status is the combined status of file upload and the metedata update in backend
    let ackResponse = await post(FILES_API.ACKNODWLEDGE_FILE_UPLOAD, { "file_id" : response["data"]["file_id"], "uploaded" : uploadedToS3 })
    return (uploadedToS3 && ackResponse["status"]) 
}


/**
 * Function to push the file to the S3 repository using presigned url
 * @param {*} file 
 * @param {*} preSignedUrl 
 * @param {*} s3ConnectionInfo 
 * @returns 
 */
async function uploadImageUsingPresignedURL(file, preSignedUrl, s3ConnectionInfo, progressCallBack, cancelFileUpload) {
    
    console.log(file, preSignedUrl, s3ConnectionInfo, progressCallBack, cancelFileUpload)
    if(cancelFileUpload === null || cancelFileUpload === undefined){
        cancelFileUpload = {
            current: null
        }
    }

    try{
        const formData = new FormData();
        Object.keys(s3ConnectionInfo).forEach(key => { formData.append(key, s3ConnectionInfo[key]) });           
        formData.append("file", file)
        let resp = await axios.post(preSignedUrl, formData, {
                headers: { 
                    'Content-Type': "multipart/form-data" 
                },
                onUploadProgress: data => {
                    let percentage = Math.round((100 * data.loaded) / data.total)
                    progressCallBack(percentage)
                },
                onCancel: new CancelToken(cancel => cancelFileUpload.current = cancel)
            })
        console.log("WASABI RESP --- ", resp)
        return (resp["status"] >= 200 && resp["status"] < 300)
    }catch(err){
        console.log("Failed to upload file to repo - ",file, err)
        if(isCancel){
            console.log("File upload is cancelled : ", file.name)
        }
        return false
    }
}


/**
 * Function to check if the file is a photo or not
 * @param  file 
 * @returns 
 */
function checkIfPhoto(file){
    return ['image/jpeg', 'image/png'].includes(file.type)
}

/**
 * Functio to get the mime type of file
 * @param {*} file 
 * @returns 
 */
function getFileMimeType(file){
    return (file.type !== null && file.type !== undefined && file.type !== "") ? file.type : "application/octet-stream"
}

export {handleFileUploadForService, handleFileEmployeeSpecificUpload}