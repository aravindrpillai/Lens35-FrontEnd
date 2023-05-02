import { Button, Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
import Stack from '@mui/material/Stack';
import { post } from "../../util/Service";
import {EMPLOYEE_APIS} from "../../util/Properties";
import { AppContext } from "../../contexts/ContextProvider";
import { useContext } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link } from "react-router-dom";
import { extractDomainNameFromURL } from "../../util/StringUtil";

export default function PortFolioField({portfolios, setOpenModal, modalCallBackHandler}){
    const [portfolioList, setPortfolioList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const { clearFlashMessage, setFlashMessage } = useContext(AppContext)
    const [newValue, setNewValue] = useState(null)


    useEffect(e=>{
      let pfList = []
      if(portfolios !== null && portfolios !== undefined && portfolios !== ""){
        portfolios.forEach(pf => {
          pfList.push(pf.value)
        })
      }
      setPortfolioList(pfList)
    },[portfolios])
    
    async function save(){
      clearFlashMessage()

      let portfoliosToSend = []
      portfolioList.forEach(url => {
        console.log("URL : ",url)
        portfoliosToSend.push({
          "name" : extractDomainNameFromURL(url),
          "value" : url
        })
      })
      let data = {"portfolios" : portfoliosToSend}
      let response = await post(EMPLOYEE_APIS.UPDATE_EMPLOYEE_PORTFOLIOS, data)
      if(response["status"] === true){
        modalCallBackHandler("portfolios", portfoliosToSend)
        setFlashMessage("success","Portfolios updated successfully")
        setOpenModal(false)
      }else{
        setError("Failed to update portfolio")
        console.log("Failed to update portfolio : ", response["message"][0])
      }
    }

    function isValidURL(string) {
      var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      return (res !== null)
    }

    function sliceUrl(url){
      if(url.length > 30)
        url = url.slice(0,30) + "......"
      return url
    }

    return (
      <React.Fragment>

        <FormControl sx={{ m: 1, width: '100%' }} variant="standard" >
          <Input
            variant="outlined" required fullWidth 
            placeholder="www.yourlink.com" 
            error={error!==null}
            disabled={ portfolioList.length >= 5}
            value = {newValue === null ? "" : newValue}
            onChange={(e)=>{ setNewValue(e.target.value) }}
            endAdornment={
              <Button disabled={ portfolioList.length >= 5} variant="outlined" disableElevation color="primary" onClick={(e)=>{ 
                if(newValue === null || newValue === ""){
                  setError("Field cannot be empty")
                  return
                }
                if(!isValidURL(newValue)){
                  setError("Invalid URL")
                  return
                }
                setError(null)
                let pListClone = portfolioList
                pListClone.push(newValue)
                setNewValue("")
                setPortfolioList(pListClone)
               }}>
                Add
              </Button>
            }
          />
          <FormHelperText>{error}</FormHelperText>
        </FormControl>

        {portfolioList && portfolioList.map((portfolio, i) =>(
          <div key={"div_"+portfolio+"-"+i}>
            <br />
            <span>{extractDomainNameFromURL(portfolio)}</span>
            <Stack direction={"row"} spacing={2} justifyContent="space-between">
              <Link href="#">{sliceUrl(portfolio)}</Link>
              <RemoveCircleOutlineIcon onClick={(e)=>{
                setPortfolioList(portfolioList.filter((pf, i2)=> i!=i2))
              }}/>
            </Stack>
          </div>
          ))}
        <br/><br/>


        <span>{error}</span>
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button variant="outlined" onClick={(e)=>{setOpenModal(false)}} >
                <DisabledByDefaultTwoToneIcon /> &nbsp; Cancel
            </Button>&nbsp;
            <Button disabled={portfolioList.length < 1} onClick={save} variant="contained" color="primary">
              <CheckBoxTwoToneIcon /> &nbsp; Save
            </Button>
        </Stack>
       
      </React.Fragment>
    )
  }
  