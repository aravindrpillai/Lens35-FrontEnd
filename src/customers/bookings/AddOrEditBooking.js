import * as React from 'react';
import { Box, Button, MobileStepper, Typography } from '@material-ui/core';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@emotion/react';
import EventCategory from './EventCategory';
import LocationDetails from './LocationDetails';
import BookingDateAndTime from './BookingDateAndTime';
import PaymentsPage from './PaymentsPage';
import Services from './Services';
import SelectEmployees from './SelectEmployees';
import { BookingContext } from '../../contexts/BookingContextProvider';

export default function AddOrEditBooking({handleProcessCompletion}) {  
  const theme = useTheme();
  const { saveData, message, validate, resetData } = React.useContext(BookingContext)
  const [currentPageNumber, setCurrentPageNumber] = React.useState(0)
  const maxSteps = 6

  let contentStyle = {
    display: "flex",
    flexDirection: "column",
    height: "70%",
    overflow: "hidden",
    overflowY: "scroll",
    scrollbarWidth: 'thin', 
    '&::-webkit-scrollbar': { width: '0.4em'},
    '&::-webkit-scrollbar-track': { background: "#f1f1f1" },
    '&::-webkit-scrollbar-thumb': { backgroundColor: '#888' },
    '&::-webkit-scrollbar-thumb:hover': { background: '#555' }
  }

  async function handleNavigation(forward){
    if(validate(currentPageNumber)){
      let canProceed = true
      if(currentPageNumber === 3){
        canProceed = await saveData()
      }
      
      let thisPageNum = currentPageNumber
      thisPageNum = forward ? (thisPageNum == 3 ? thisPageNum+2 : thisPageNum+1) : thisPageNum == 5 ? thisPageNum-2 : thisPageNum-1
      if(canProceed){
        setCurrentPageNumber(thisPageNum)
      }
      
      
    }
  }

  function showEmployees(){
    setCurrentPageNumber(4)
  }

  function handleProcessCompletion_Child(){
    resetData()
    setCurrentPageNumber(0)
    handleProcessCompletion()
  }

  return (
    <React.Fragment>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            { currentPageNumber === 0 && <span>Tell us about your event</span> }
            { currentPageNumber === 1 && <span>When do you need the booking?</span> }
            { currentPageNumber === 2 && <span>Tell us where to come!</span> }
            { currentPageNumber === 3 && <span>Specify the services you are looking for </span> }
            { currentPageNumber === 4 && <span>Select your favourite photographer </span> }
            { currentPageNumber === 5 && <span>Payment. </span> }
        </Typography>
        <br/>
            <Box sx={contentStyle}>
            { currentPageNumber === 0 && <EventCategory /> }
            { currentPageNumber === 1 && <BookingDateAndTime /> }
            { currentPageNumber === 2 && <LocationDetails /> }
            { currentPageNumber === 3 && <Services showEmployees={showEmployees}/> }
            { currentPageNumber === 4 && <SelectEmployees /> }
            { currentPageNumber === 5 && <PaymentsPage handleProcessCompletion={handleProcessCompletion_Child}/> }
            </Box>
        <br/>
        <center><Typography>{message}</Typography></center>
        <br/>
        <MobileStepper variant="progress" steps={maxSteps} position="static" activeStep={currentPageNumber} sx={{ maxWidth: "100%", flexGrow: 1 }}
          nextButton={
            <Button size="small" onClick={(e)=>{handleNavigation(true)}} disabled={currentPageNumber === (maxSteps-1)} >
              Next {theme.direction === 'rtl' ? ( <KeyboardArrowLeft /> ) : ( <KeyboardArrowRight /> )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={(e)=>{handleNavigation(false)}} disabled={currentPageNumber === 0}>
              {theme.direction === 'rtl' ? (<KeyboardArrowRight /> ) : ( <KeyboardArrowLeft /> )} Back
            </Button>
          }
        />
    </React.Fragment>
    )
  }
  