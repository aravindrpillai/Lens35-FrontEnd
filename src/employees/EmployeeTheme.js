import React from "react";
import EmployeeUIFrame from "./EmployeeUIFrame";

export default function EmployeeTheme( props ) {

    return (
      <React.Fragment>
        <EmployeeUIFrame />
        { props.children }
      </React.Fragment>
    );
  }