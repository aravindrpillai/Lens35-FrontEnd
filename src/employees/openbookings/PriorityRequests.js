import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Stack } from "@mui/material";
import { Button, IconButton } from "@material-ui/core";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function PriorityRequests() {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Event Details</TableCell>
            <TableCell>Date/Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell>Birthday</TableCell>
            <TableCell>22nd Dec<br/>For 4Hrs</TableCell>
            <TableCell>Anchal<br/> 691306</TableCell>
            <TableCell>2Kms Far</TableCell>
            <TableCell>
                <Stack direction="row" justifyContent="space-between">
                    <IconButton variant="outlined"><RemoveRedEyeIcon/></IconButton>
                </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
