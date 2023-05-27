import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { SelectBookings } from './SelectBookings';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import EachFile from './EachFile';
import { get, post } from '../../util/Service';
import { EMPLOYEE_APIS } from '../../util/Properties';
import EachAlreadyUploadedFile from './EachAlreadyUploadedFile';
import { AppContext } from '../../contexts/ContextProvider';
import SubmitAndLock from './SubmitAndLock';
import ConfirmationModal from '../../Components/ConfirmationModal';

export default function UploadSection() {

    const { clearFlashMessage, setFlashMessage, setLoading } = React.useContext(AppContext)
    const [checkedFiles, setCheckedFiles] = useState([]) 
    const [openBookingList, setOpenBookingList] = useState(false) 
    const [openSubmitAndLock, setOpenSubmitAndLock] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false) 
    const [newlyUploadingFiles, setNewlyUploadingFiles] = useState([]) 
    const [alreadyUploadedFiles, setAlreadyUploadedFiles] = useState([]) 
    const [selectedBooking, setSelectedBooking] = React.useState(null)
    const [selectedService, setSelectedService] = React.useState(null)
  
    useEffect(e=>{
        clearFlashMessage()
        async function loadUploadedFiles(){
            let uploadedFiles = await get(EMPLOYEE_APIS.FETCH_UPLOADED_FILES_OF_SERVICE.concat(selectedService.service_id+"/"))
            setAlreadyUploadedFiles(uploadedFiles["data"])
        }
        if(selectedService !== null && selectedService !== undefined){
            loadUploadedFiles()
        }
    },[selectedService])


    function serviceSelectionCallBackHandler(booking, service){
        setSelectedBooking(booking)
        setSelectedService(service)
        setNewlyUploadingFiles([])
        setAlreadyUploadedFiles([])
        setOpenBookingList(false)
    }

    async function deleteFiles(){
        setOpenDeleteModal(false)
        setLoading(true)
        let body = { "file_ids" : checkedFiles} 
        let response = await post(EMPLOYEE_APIS.DELETE_FILE, body)
        if(response["status"] === true){
            let newList = alreadyUploadedFiles.filter(f => !checkedFiles.includes(f.file_id))
            setAlreadyUploadedFiles(newList)
            setCheckedFiles([])
            setFlashMessage("success", "Successfully deleted the files ") 
        }else{
            setFlashMessage("error", "Failed to delete the files "+response["messages"][0]) 
        }
        setLoading(false)
    }




    function selectAllHandler(){
        if(checkedFiles.length > 0){
            setCheckedFiles([])
        }else{
            let file_id_arr = []
            alreadyUploadedFiles.forEach(e=>{file_id_arr.push(e.file_id)})
            setCheckedFiles(file_id_arr)
        }
    }

    async function loadFilesPostSelect(selectedFiles){
        let file = null;
        let fileArray = []
        for(let key=0; key < selectedFiles.length ; key++){
            file = selectedFiles[key]
            fileArray.push({
                key:((new Date().getTime())+"-"+key),
                file:file
            })
        }
        setNewlyUploadingFiles(fileArray)
    }

    

    function successfullyUploadedHandler(file_data){
        setAlreadyUploadedFiles(prvData => [...prvData, file_data])
    }


    function handleCheckBoxHandler(file_id){
        if(checkedFiles.includes(file_id)){
            let newCheckedFiles = checkedFiles.filter(eachFile => eachFile !== file_id)
            setCheckedFiles(newCheckedFiles)
        }else{
            setCheckedFiles([...checkedFiles, file_id])
        }
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <SelectBookings open={openBookingList} openHandler={setOpenBookingList} serviceSelectionCallBackHandler={serviceSelectionCallBackHandler} />
                <SubmitAndLock open={openSubmitAndLock} openHandler={setOpenSubmitAndLock} />
                <ConfirmationModal 
                    open={openDeleteModal} 
                    openHandler={setOpenDeleteModal} 
                    confirmHandler={deleteFiles} 
                    title={"Confirm Delete Action"} 
                    content={"Please confirm if you want to delete the selected files."} />
                <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }} >
                    <div>    
                    <Button variant="outlined" onClick={(e)=>setOpenBookingList(true)}> {selectedService === null ? "Select Booking" : (selectedBooking.event+ " - " +selectedService.service)} </Button>
                    {selectedService !== null &&
                        <>&nbsp;
                        <Button variant="outlined" onClick={(e)=>setOpenSubmitAndLock(true)}> Lock & Submit </Button>
                        </>
                    }
                    </div>
                    
                    {selectedService !== null &&
                    <div>
                        {checkedFiles.length > 0 &&
                        <Button size="small" color="primary" variant="outlined" component="label" onClick={()=>{setOpenDeleteModal(true)}}>
                            <DeleteIcon/> <span>&nbsp; Delete ({checkedFiles.length})</span>
                        </Button>
                        }
                        &nbsp;

                        {alreadyUploadedFiles.length > 0 &&
                        <Button size="small" color="primary" variant="outlined" component="label" onClick={selectAllHandler}>
                            {checkedFiles.length <= 0 && <CheckBoxOutlineBlankIcon/>}
                            {checkedFiles.length > 0 && <CheckBoxIcon/>}
                            <span>&nbsp; {checkedFiles.length > 0 ? "Unselect All" : "Select All" }</span>
                        </Button>
                        }
                        &nbsp;
                        <Button size="small" color="primary" variant="outlined" component="label">
                            <input hidden accept="image/*" multiple={true} type='file' onChange={(e)=>{loadFilesPostSelect(e.target.files)}}/>
                            <CameraAltIcon/>
                            <span>&nbsp; Upload Files</span>
                        </Button>
                        
                    </div>
                    }
                </Stack>
            </Grid>

            {newlyUploadingFiles.map((file) => ( 
                <EachFile 
                    key={file.key} 
                    _booking={selectedBooking}
                    _service={selectedService} 
                    _key={file.key}
                    _file={file.file}  
                    _successfullyUploadedHandler = {successfullyUploadedHandler}
                    />
            ))}

            {alreadyUploadedFiles.map((file) => ( 
                <EachAlreadyUploadedFile 
                    key={file.file_id} 
                    _key={file.file_name} 
                    _file={file}
                    _isChecked ={checkedFiles.includes(file.file_id)}
                    _checkHandler = {handleCheckBoxHandler}
                    />
            ))}

        </Grid>
    );
}