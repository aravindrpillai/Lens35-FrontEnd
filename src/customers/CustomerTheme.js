import React from "react";
import CustomerUIFrame from "./CustomerUIFrame";

export default function CustomerTheme( props ) {
    return (
      <React.Fragment>
        <CustomerUIFrame/>
        { props.children }
      </React.Fragment>
    )
  }