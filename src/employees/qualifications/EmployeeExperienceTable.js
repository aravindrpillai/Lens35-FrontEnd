import React, { useContext, useEffect, useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { IconButton } from "@material-ui/core";
import { Stack } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { get, post } from "../../util/Service";
import { BASE_URL, EMPLOYEE_APIS } from "../../util/Properties";
import { AppContext } from "../../contexts/ContextProvider";

export default function EmployeeExperienceTable(props) {
    const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
    const [data, setData] = useState([])
    useEffect((e)=>{
        loadData()
    },[props])

    async function loadData(){
        var response = await get(EMPLOYEE_APIS.FETCH_EMPLOYEE_EXPERIENCE)
        if(response["status"] === true){
            console.log(response["data"])
            setData(response["data"])
        }else{
            setFlashMessage("error","Failed to fetch experiences")
            console.log("Failed to fetch experience data")
        }
    }

    function editEmploymentRecord(emp_id){
        props.editEmploymentRecord(emp_id)
    }


    async function deleteEmploymentRecord(emp_id){
        if(! window.confirm("Are you sure?")){
            return
        }
        var data = {
            "experience_id" : emp_id
        }
        var response = await post(EMPLOYEE_APIS.DELETE_EMPLOYEE_EXPERIENCE, data)
        if(response["status"] === true){
            setFlashMessage("success","Employment data deleted successfully")
            console.log("Employment data deleted successflly")
            loadData()
        }else{
            setFlashMessage("error",response["messages"][0])
            console.log("Failed to delete employment data.", response["messages"][0])
        }
    }

    return (
        <React.Fragment>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow hover key={"header"}>
                            <TableCell><b>Office/Company</b></TableCell>
                            <TableCell><b>Employment Period</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                        <TableRow hover key={row["experience_id"]}>
                            <TableCell><font color="primary">{row["office_name"]}</font><br/><font size="1">as {row["designation"]}</font></TableCell>
                            <TableCell>{formatDateToDisplay(row["employment_start_date"])} <font size="1">to</font> <br/>{formatDateToDisplay(row["employment_end_date"], row["currently_working_here"])}</TableCell>
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                {(row["document"] !== null && row["document"] !== undefined)  &&
                                <a href={BASE_URL.concat(row["document"]["document_name"])} target="_blank"><IconButton color="primary" size="small"><FilePresentIcon/></IconButton></a>
                                }
                                <IconButton color="primary" size="small" onClick={e=>{editEmploymentRecord(row["experience_id"])}}><AppRegistrationIcon/></IconButton>
                                <IconButton color="secondary" size="small" onClick={e=>{deleteEmploymentRecord(row["experience_id"])}}><DeleteIcon/></IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

function formatDateToDisplay(dataAsString, currentEmploymet=false){
    if(currentEmploymet){
        return "On Going"
    }
    var dtSplit = dataAsString.split("-")
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[dtSplit[1]-1] +" "+dtSplit[0]
}