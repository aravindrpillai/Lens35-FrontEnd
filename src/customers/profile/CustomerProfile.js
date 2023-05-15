import React from "react";
import Content from "../../Components/Content";
import { Button, FormControlLabel, Grid } from "@material-ui/core";
import SummaryCard from "../../Components/SummaryCard";
import Checkbox from '@mui/material/Checkbox';
import TransitionsModal from "../../Components/Modal";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FullNameField from "./FullNameField";
import EmailField from "./EmailField";
import ImageUpload from "./ImageUploadField";
import { get, post } from "../../util/Service";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/ContextProvider";
import MobileNumberField from "./MobileNumberField";
import CustomerTheme from "../CustomerTheme";
import { CUSTOMER_APIS } from "../../util/Properties";


export default function CustomerProfile() {
  const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
  const [openModal, setOpenModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState(null);
  const [modelContent, setModalContent] = React.useState(null);
  const [loading, setLoading] = React.useState(false)
  const [pageData, setPageData] = React.useState({})
  const [subscribed, setSubscribed] = React.useState(false)

  async function loadPageData(){
    setLoading(true)
    let response = await get(CUSTOMER_APIS.FETCH_PROFILE_INFO)
    if(response["status"] === true){
      let respData = response["data"]
      if(respData["full_name"] === null){
        setFlashMessage("warning","Please update your details to use the application")
      }
      setPageData(respData)
      setSubscribed(respData["subscribe_for_updates"])
    }else{
      console.log("Failed to fetch data. Please try again.", response["status"])
      setFlashMessage("error","Failed to fetch data. Please try again.")  
    }
    setLoading(false)
  }

  
  useEffect(e=>{
    clearFlashMessage();
    loadPageData();
  },[])



  async function modalCallBackHandler(field, value){
    const newPageData = {...pageData, [field]:value}
    setPageData(newPageData)
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
      case "mob": 
        setOpenModal(true);
        setModalTitle("Mobile Number")
        setModalContent(<MobileNumberField setOpenModal={setOpenModal} mobile_number={pageData["mobile_number"]} modalCallBackHandler={modalCallBackHandler} />)
        break
    }
  }

  async function handleSubscriptionChange(event){
    setSubscribed(event.target.checked)
    let response = await post(CUSTOMER_APIS.UPDATE_CUSTOMER_BASIC_INFO, {"subscribe_for_updates" : event.target.checked})
    if(response["status"] !== true){
      console.log("error","Failed to update subscription. ", response["messages"][0])  
      setFlashMessage("error","Failed to update subscription preference. Please try again.")  
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
              <td>Email</td>
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
              <td><hr/></td>
              <td><hr/></td>
              <td><hr/></td>
            </tr>
            
          </tbody>
        </table>
        <FormControlLabel onClick={handleSubscriptionChange} control={<Checkbox checked={subscribed} />} label="Subscribe For Updates" />
        
      </React.Fragment>
    )
  }
  
  
  return (
    <CustomerTheme>
      <Content>
          <TransitionsModal open={openModal} setOpen={setOpenModal} title = {modalTitle} content={modelContent} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={4}> 
              <SummaryCard title={"Profile Picture"} component={<ImageUpload image_from_server={pageData["display_picture"]} />} />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <SummaryCard title={"Primary Info"} component={<ProfileDetails />} />
            </Grid>
          </Grid>
    </Content>
   </CustomerTheme>
  );
}
