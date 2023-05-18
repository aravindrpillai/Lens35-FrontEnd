
import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Stack } from "@mui/material";

export default function Copyright() {
    return (
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="body2" color="textSecondary">Copyright © 2023</Typography>
          <Typography variant="body2" color="textSecondary">&nbsp;&nbsp;||&nbsp;&nbsp;</Typography>
          <Typography variant="body2" color="textSecondary"><Link target="_blank" color="inherit" href="http://www.aravindrpillai.com/">aravindrpillai.com</Link></Typography>
        </Stack>
    )
  }