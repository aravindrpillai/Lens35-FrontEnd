
import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "} &nbsp;&nbsp; || &nbsp;&nbsp;
        <Link color="inherit" href="http://www.aravindrpillai.com/">aravindrpillai.com</Link>
        &nbsp;&nbsp; || &nbsp;&nbsp;{new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }