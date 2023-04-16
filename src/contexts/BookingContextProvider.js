import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { get, post } from "../util/Service";
import {BOOKING_APIS} from "../util/Properties" 
import { duration } from "moment";
import { getDefaultBookingStartDate } from "../util/DateUtil";

export const BookingContext = createContext();


export function BookingContextProvider({ children, booking_id=null }) {
  
  //Private Variables - To see if the original value is changed or not.
  const [bookingID, setBookingID] = useState(null)
  const [eventHistory, setEventHistory] = useState(null)
  const [eventDescriptionHistory, setEventDescriptionHistory] = useState(null)
  const [bookingStartDateAndTimeHistory, setBookingStartDateAndTimeHistory] = useState(null)
  const [bookingDurationHistory, setBookingDurationHistory] = useState(null)
  const [postalCodeHistory, setPostalCodeHistory] = useState(null)
  const [cityHistory, setCityHistory] = useState(null)
  const [addressHistory, setAddressHistory] = useState("")
  const [photographerHistory , setPhotographerHistory] = React.useState(true)
  const [videographerHistory , setVideographerHistory] = React.useState(false)
  const [droneHistory , setDroneHistory] = React.useState(false)
  const [photographerPreferenceHistory, setPhotographerPreferenceHistory] = React.useState([])
  const [videographerPreferenceHistory, setVideographerPreferenceHistory] = React.useState([])

  //Public Variables
  const [event, setEvent] = useState(null)
  const [eventDescription, setEventDescription] = useState(null)
  const [bookingStartDateAndTime, setBookingStartDateAndTime] = useState(getDefaultBookingStartDate())
  const [bookingDuration, setBookingDuration] = useState(3)
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  
  const [photographerCount , setPhotographerCount] = React.useState(0)
  const [videographerCount , setVideographerCount] = React.useState(0)
  const [droneCount , setDroneCount] = React.useState(0)

  const [invoice , setInvoice] = React.useState(null)

  const [photographerPreference , setPhotographerPreference] = React.useState([])
  const [videographerPreference , setVideographerPreference] = React.useState([])
  const [paymentInformation , setPaymentInformation] = React.useState(null)
  
  //Common variables
  const [message, setMessage] = useState(null)

  function resetData(){
    setBookingID(null)
    
    //History
    setEventHistory(null)
    setEventDescriptionHistory(null)
    setBookingStartDateAndTimeHistory(null)
    setBookingDurationHistory(null)
    setPostalCodeHistory(null)
    setCityHistory(null)
    setAddressHistory("")
    setPhotographerHistory(true)
    setVideographerHistory(false)
    setDroneHistory(false)
    setPhotographerPreferenceHistory([])
    setVideographerPreferenceHistory([])
    
    //Live fields
    setEvent(null)
    setEventDescription(null)
    setBookingStartDateAndTime(getDefaultBookingStartDate())
    setBookingDuration(3)
    setPostalCode("")
    setCity("")
    setAddress("")
    setPhotographerCount(0)
    setVideographerCount(0)
    setDroneCount(0)
    setPhotographerPreference([])
    setVideographerPreference([])
    setPaymentInformation(null)
  }

  async function saveData(){
    let start_date = null
    let start_time = null
    if(bookingStartDateAndTime !== "" && bookingStartDateAndTime !== null){
      let b = bookingStartDateAndTime.split("T")
      start_date = b[0]
      start_time = b[1]
    }
    let request = {   
      "booking_id": bookingID,
      "event" : event,
      "event_description" : eventDescription,
      "event_date" : start_date,
      "event_start_time" : start_time,
      "event_duration" : bookingDuration,
      "event_postal_code" : postalCode,
      "event_city" : city,
      "event_address" : address
    }
    var booking_response = await post(BOOKING_APIS.UPDATE_BOOKING, request)
    if(booking_response["status"] === true){
      let booking_id = booking_response["data"]["booking_id"]
      setBookingID(booking_id)
      let services_data = {
        "booking_id": booking_id,
        "photography": photographerCount,
        "videography": videographerCount,
        "drone_photography": droneCount,
        "photo_editing": 0,
        "video_editing": 0
      }
      var service_response = await post(BOOKING_APIS.ADD_SERVICES, services_data)
      if(service_response["status"] === true){
        var invoice = await get(BOOKING_APIS.FETCH_INVOICE.concat(booking_id).concat("/"))
        if(invoice["status"] === true){
          setInvoice(invoice["data"])
        }else{
          console.log("Failed to fetch invoice. "+invoice["message"])
          setMessage("Failed to fetch invoice. "+invoice["message"])
        }
      }else{
        console.log("Failed register the services. "+service_response["message"])
        setMessage("Failed register the services. "+service_response["message"])
      }
    }else{
      console.log("Failed register the booking. "+booking_response["message"])
      setMessage("Failed register the booking. "+booking_response["message"])
    }
    
    
    // if(response["status"] === true){
    //   setBookingID(response["data"]["booking_id"])
    //   var response = await post(BOOKING_APIS.FETCH_INVOICE, { "booking_id": response["data"]["booking_id"] })
    //   setPaymentInformation(response["data"])
    // }else{
    //   console.log("Failed -- ", response["messages"][0])
    // }
    return true
  }

  async function fetchBooking(booking_id){
    //let response = await post(BOOKING_APIS.FETCH_BOOKING,{"booking_id":booking_id})
    //console.timeLog(response)
  }


  function validate(pageNumber){
    setMessage(null)
    if(pageNumber === 0){
      if(event === null || event === ""){
        setMessage("Please select an event")
        return false
      }
    }
    if(pageNumber === 1){
      if(bookingStartDateAndTime === null || bookingStartDateAndTime === ""){
        setMessage("Please provide a booking start date")
        return false
      }
      if(bookingDuration === null || bookingDuration === ""){
        setMessage("Please specify the duration of your booking")
        return false
      }
      if(event === "other" && (eventDescription === "" || eventDescription === null)) {
        setMessage("Please provide an event description")
        return false
      }

    }
    if(pageNumber === 2){
      if(address === null || address === ""){
        setMessage("Please provide the event address")
        return false
      }
      if(postalCode === null || postalCode === ""){
        setMessage("Please provide the area postal code")
        return false
      }
      if(city === null || city === ""){
        setMessage("Please specify the city")
        return false
      }
    }
    if(pageNumber === 3){
      if(photographerCount < 1 && videographerCount < 1 && droneCount < 1){
        setMessage("Atleast one service must be selected to proceed.")
        return false
      }
    }
    if(pageNumber === 4){
      
    }

    console.log("Preference -- > ",photographerPreference)

    return true
  }



  useEffect((e) => {
    if(booking_id !== null){
      setBookingID(booking_id)
      //fetchBooking(booking_id)
    }    
  }, [booking_id]);

  return (
    <BookingContext.Provider
      value = {{
        saveData, resetData,
        message, setMessage, validate,
        

        bookingID, paymentInformation,
        event, setEvent,
        eventDescription, setEventDescription,
        bookingStartDateAndTime, setBookingStartDateAndTime,
        bookingDuration, setBookingDuration,
        postalCode, setPostalCode,
        city, setCity,
        address, setAddress,

        photographerCount , setPhotographerCount,
        videographerCount , setVideographerCount,
        droneCount , setDroneCount,
        
        invoice , setInvoice,

        photographerPreference , setPhotographerPreference,
        videographerPreference , setVideographerPreference
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
