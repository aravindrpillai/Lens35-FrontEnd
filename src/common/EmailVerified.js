import React from 'react';
import { useEffect } from 'react';
import { get } from '../util/Service';
import { CUSTOMER_APIS, EMPLOYEE_APIS } from '../util/Properties';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

const EmailVerified = () => {
  const containerStyles = {
    backgroundColor: '#FFFFFF',
    color: '#4A5568',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'center',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const headerStyles = {
    backgroundColor: '#2D3748',
    color: 'white',
    padding: '10px',
    textAlign: 'center'
  };

  const footerStyles = {
    backgroundColor: '#2D3748',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%'
  };

  const h1Styles = {
    fontSize: '2em',
    margin: '0 0 20px',
    color: '#2D3748'
  };

  const pStyles = {
    fontSize: '1.2em',
    margin: '0',
    color: '#4A5568'
  };

  const [loading, setLoading] =useState(false)
  const [name, setName] =useState(null)
  const [status, setStatus] =useState(false)


  async function verifyEmail(usertype, token){
    let url = usertype === "customer" ? CUSTOMER_APIS.VERIFY_EMAIL : EMPLOYEE_APIS.VERIFY_EMAIL 
    let resp = await get(url.concat(token+"/"))
    if(resp["status"]){
      setName(resp["data"]["full_name"])
      setStatus(true)
    }else{
      setStatus(false)
    }
    setLoading(false)
  }

 

  useEffect(e=>{
    setLoading(true)
    const query = new URLSearchParams(window.location.search);
    let user = query.get("u")
    let token = query.get("t")
    verifyEmail(user, token)
  },[])

  return (
    <div>
      <header style={headerStyles}>
        <h2>Lens35.com</h2>
      </header>
      
      {loading && 
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}> 
        <Stack direction={'column'}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5vh' }}> <CircularProgress /></Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10vh' }}> <Typography>Verifying... Please Wait!</Typography></Box>
        </Stack>
      </Box>
      }
      
      { status && !loading &&
      <div style={containerStyles}>
        <h1 style={h1Styles}>Hello <br/>{name}</h1>
        <br/>
        <p style={{color: 'green', fontWeight: 'bold'}}>Your email has been successfully verified.</p>
        <br/>
        <p style={pStyles}>You are now all set to fall in love with our service!</p>
        <br/>
        <p style={pStyles}>Thank you</p>
      </div>
      }
      { !status && !loading &&
      <div style={containerStyles}>
        <br/>
        <h1 style={h1Styles}>Hello</h1>
        <p style={{color: 'red', fontWeight: 'bold'}}>Sorry, we couldn't verify your email.<br/>Please go to your profile and confirm if its already verified or not.</p>
        <br/>
        <p style={pStyles}>Please reach out to lens35 helpdesk for any further help</p>
      </div>
      }
      
      <footer style={footerStyles}>
        <p>© 2023 Lens35. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmailVerified;
