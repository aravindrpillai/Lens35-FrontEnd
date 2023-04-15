import React, { useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { IconButton } from "@material-ui/core";
import { Stack } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default function EmployeeQualificationTable() {
  return (
    <React.Fragment>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow hover>
                        <TableCell>Course</TableCell>
                        <TableCell>Completed on</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow hover>
                        <TableCell>Engineering From Kerala University</TableCell>
                        <TableCell>May 2017</TableCell>
                        <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton color="primary" size="small"><FilePresentIcon/></IconButton>
                            <IconButton color="primary" size="small"><AppRegistrationIcon/></IconButton>
                            <IconButton color="secondary" size="small"><DeleteIcon/></IconButton>
                            </Stack>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
  );
}
