import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { SelectBookings } from './SelectBookings';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import EachFile from './EachFile';

export default function UploadSection() {

    const [checkedFiles, setCheckedFiles] = useState([]) 
    const [openBookingList, setOpenBookingList] = useState(false) 
    const [selectAllFiles, setSelectAllFiles] = useState(false) 
    const [files, setFiles] = useState([]) 
    const [selectedBooking, setSelectedBooking] = React.useState(null)
    const [selectedService, setSelectedService] = React.useState(null)
  

  function serviceSelectionCallBackHandler(booking, service){
    setSelectedBooking(booking)
    setSelectedService(service)
    setOpenBookingList(false)
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
        setFiles(fileArray)
    }


    function handleCheckBoxClick(key, file){
        if(checkedFiles.includes(file)){
            let newCheckedFiles = checkedFiles.filter(eachFile => eachFile !== file)
            setCheckedFiles(newCheckedFiles)
        }else{
            setCheckedFiles([...checkedFiles, file])
        }
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }} >
                    <Button variant="outlined" onClick={(e)=>setOpenBookingList(true)}> {selectedService === null ? "Select Booking" : (selectedBooking.event+ " - " +selectedService.service)} </Button>
                    <SelectBookings open={openBookingList} openHandler={setOpenBookingList} serviceSelectionCallBackHandler={serviceSelectionCallBackHandler} />
                    
                    {selectedService !== null &&
                    <div>

                        <Button size="small" color="primary" variant="outlined" component="label">
                            <DeleteIcon/>
                            <span>&nbsp; Delete ({checkedFiles.length})</span>
                        </Button>
                        &nbsp;
                        
                        <Button size="small" color="primary" variant="outlined" component="label"  >
                            <CheckBoxOutlineBlankIcon/>
                            <CheckBoxIcon/>
                            <span>&nbsp; {selectAllFiles ? "Unselect All" : "Select All" }</span>
                        </Button>
                        
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

            {files.map((file) => ( 
                <EachFile 
                    key={file.key} 
                    _booking={selectedBooking}
                    _service={selectedService} 
                    _key={file.key}
                    _file={file.file}  />
            ))}

        </Grid>
    );
}