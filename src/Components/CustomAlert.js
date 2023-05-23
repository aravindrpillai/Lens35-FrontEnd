import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

export default function CustomAlert({messageType, message}) {
  const [open, setOpen] = React.useState(true);

    useEffect(e=>{
        setOpen(message !== null && message !== undefined && message !== "")
    },[message])

    return (
      <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          <Alert severity={messageType} sx={{ mb: 2 }}
            action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false) }} > <CloseIcon fontSize="inherit" /> </IconButton> }>
            {message}
          </Alert>
        </Collapse>
      </Box>
    )
}