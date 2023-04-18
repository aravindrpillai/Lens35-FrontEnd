import React, { useState } from "react";
import { createContext } from "react";
import moment from "moment";

export const AppContext = createContext();
export const currentDay = moment();

export function ContextProvider({ children }) {
  
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [messageType, setMessageType] = React.useState("info") //success, info, warning, error

  function clearFlashMessage() {
    setMessage(null)
    setMessageType("info")
  }
  function setFlashMessage(_type, _message) {
    setMessage(_message)
    setMessageType(_type)
  }


  return (
    <AppContext.Provider
      value = {{
        userData, setUserData,
        message, setMessage,
        messageType, setMessageType,
        loading, setLoading,
        clearFlashMessage, setFlashMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
