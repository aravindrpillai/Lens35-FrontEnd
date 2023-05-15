import React from "react";
import Content from "../../Components/Content";
import { Button, Grid } from "@material-ui/core";
import SummaryCard from "../../Components/SummaryCard";
import EmployeeTheme from "./../EmployeeTheme";
import TransitionsModal from "../../Components/Modal";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FullNameField from "./FullNameField";
import EmailField from "./EmailField";
import ImageUpload from "./ImageUploadField";
import { get } from "../../util/Service";
import {EMPLOYEE_APIS} from "../../util/Properties";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/ContextProvider";
import DateOfBirthField from "./DateOfBirthField";
import MobileNumberField from "./MobileNumberField";
import IDProofs from "./IDProofs";
import BaseLocationField from "./BaseLocationField";
import { Stack } from "@mui/system";
import PortFolioField from "./PortFolioField";
import ServicesComponent from "./ServicesComponent";
import { Link } from "react-router-dom";


export default function EmployeeProfile() {
  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
  const [openModal, setOpenModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState(null);
  const [modelContent, setModalContent] = React.useState(null);
  const [pageData, setPageData] = React.useState({})


  async function loadPageData(){
    let response = await get(EMPLOYEE_APIS.FETCH_EMPLOYEE_DATA)
    if(response["status"] === true){
      let respData = response["data"]
      console.log("RESP DAT : ", respData)
      setPageData(respData)
      if(respData["is_draft"] === true){
        setFlashMessage("warning","Please fill all the information to activate the account")
      }
    }else{
      setFlashMessage("error","Failed to fetch data. Please try again.")  
    }
  }

  
  useEffect(e=>{
    clearFlashMessage();
    loadPageData();
  },[])



  async function modalCallBackHandler(field, value){
    const newPageData = {...pageData, [field]:value}
    setPageData(newPageData)
  }
  
  function getDocumentType(type){
    switch(type){
      case "aadharcard": return "Aadhar Card"
      case "passport": return "Passport"
      case "driving_licence": return "Driving License"
      case "voters_id": return "Voters ID"
    }
  }

  function editClickHandler(field){
    setOpenModal(false);
    setModalTitle(null)
    setModalContent(null)

    switch(field){
      case "name": 
        setOpenModal(true);
        setModalTitle("Name")
        setModalContent(<FullNameField setOpenModal={setOpenModal} full_name={pageData["full_name"]} modalCallBackHandler={modalCallBackHandler}/>)
        break
      case "email": 
        setOpenModal(true);
        setModalTitle("EmailID")
        setModalContent(<EmailField setOpenModal={setOpenModal} email={pageData["email_id"]} modalCallBackHandler={modalCallBackHandler} />)
        break
      case "base_location": 
        setOpenModal(true);
        setModalTitle("Base Location")
        setModalContent(<BaseLocationField setOpenModal={setOpenModal} base_location_city={pageData["base_location_city"]} base_location_pincode = {pageData["base_location_pincode"]} modalCallBackHandler={modalCallBackHandler} />)
        break
      case "mob": 
        setOpenModal(true);
        setModalTitle("Mobile Number")
        setModalContent(<MobileNumberField setOpenModal={setOpenModal} mobile_number={pageData["mobile_number"]} modalCallBackHandler={modalCallBackHandler} />)
        break
      case "dob": 
        setOpenModal(true);
        setModalTitle("Date Of Birth")
        setModalContent(<DateOfBirthField setOpenModal={setOpenModal} dob={pageData["date_of_birth"]} modalCallBackHandler={modalCallBackHandler}/>)
        break
      case "id_proof": 
        setOpenModal(true);
        setModalTitle("ID Proof")
        setModalContent(<IDProofs default_doc_type={pageData["id_proof_type"]} default_doc_front_side={pageData["id_proof_front"]} default_doc_back_side={pageData["id_proof_back"]} modalCallBackHandler={modalCallBackHandler}/>)
        break
      case "portfolio": 
        setOpenModal(true);
        setModalTitle("Portfolios")
        setModalContent(<PortFolioField portfolios={pageData["portfolios"]} setOpenModal={setOpenModal} modalCallBackHandler={modalCallBackHandler}/>)
        break

        
    }
  }

    
  function ProfileDetails(){
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td> : {pageData["full_name"]}</td><td><Button onClick={(e)=>{editClickHandler("name")}}><EditTwoToneIcon/></Button></td>
            </tr>
            <tr>
              <td>Email </td>
              <td> : {pageData["email_id"]} 
              {
              (pageData["email_id"] !== null && pageData["email_id"] !== "") &&
              <font color={pageData["email_id_verified"] ? "green" : "red"}>&nbsp;&nbsp;{pageData["email_id_verified"] ? "(verified)" : "(not verified)"}</font>
              }
              </td>
              <td><Button onClick={(e)=>{editClickHandler("email")}}><EditTwoToneIcon/></Button></td>
            </tr>
            <tr>
              <td>Mobile Number</td><td> : {pageData["mobile_number"]}</td>
              <td><Button onClick={(e)=>{editClickHandler("mob")}}><EditTwoToneIcon/></Button></td>
            </tr>
            <tr>
              <td>ID Proof</td><td> : {getDocumentType(pageData["id_proof_type"])}</td>
              <td><Button onClick={(e)=>{editClickHandler("id_proof")}}><EditTwoToneIcon/></Button></td>
            </tr>
            <tr>
              <td>Base Location</td><td> : {pageData["base_location_city"]} - {pageData["base_location_pincode"]}</td>
              <td><Button onClick={(e)=>{editClickHandler("base_location")}}><EditTwoToneIcon/></Button></td>
            </tr>

            <tr>
              <td>Portfolios</td>
              <td>
                <Stack direction="column" spacing={0} > 
                  {pageData["portfolios"] && pageData["portfolios"].map((portfolio) => (
                    <li key={portfolio.name}>
                      <a href={portfolio.value} underline="hover" target="_blank" rel="noopener noreferrer">{portfolio.name}</a>
                    </li>
                  ))}
                </Stack>
              </td>
              <td><Button onClick={(e)=>{editClickHandler("portfolio")}}><EditTwoToneIcon/></Button></td>
            </tr>
            
          </tbody>
        </table>
        
      </React.Fragment>
    )
  }
  
  
  return (
    <EmployeeTheme>
      <Content>
          <TransitionsModal open={openModal} setOpen={setOpenModal} title = {modalTitle} content={modelContent} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={4}> 
              <SummaryCard title={"Profile Picture"} component={<ImageUpload image_from_server={pageData["display_picture"]} />} />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <SummaryCard title={"Primary Info"} component={<ProfileDetails />} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <ServicesComponent 
                is_photographer = {pageData["is_photographer"]}
                is_videographer = {pageData["is_videographer"]}
                is_drone_photographer = {pageData["is_drone_photographer"]}
                is_photo_editor = {pageData["is_photo_editor"]}
                is_video_editor = {pageData["is_video_editor"]}
              />
            </Grid>
          </Grid>
    </Content>
   </EmployeeTheme>
  );
}
