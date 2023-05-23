import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  Checkbox,
  TextField,
} from '@material-ui/core';
import { Stack } from '@mui/material';

const data = [
    {"id":"1", "date":"2012-11-11", "amount":"1000", "status":"In-Process", "bank":"SBI (111100987)"},
    {"id":"2", "date":"2012-10-31", "amount":"3000", "status":"In-Process", "bank":"HDFC (345643222)"},
    {"id":"3", "date":"2012-09-21", "amount":"4532", "status":"Success", "bank":"SBI (111100987)"},
    {"id":"4", "date":"2012-07-14", "amount":"2343", "status":"Success", "bank":"SBI (111100987)"},
    {"id":"5", "date":"2012-06-07", "amount":"4564", "status":"Failed", "bank":"ICICI (3434343244)"},
    {"id":"6", "date":"2012-03-05", "amount":"2123", "status":"Success", "bank":"SBI (111100987)"},
    {"id":"7", "date":"2012-02-20", "amount":"3453", "status":"Success", "bank":"SBI (111100987)"},
    {"id":"8", "date":"2012-01-01", "amount":"2000", "status":"Failed", "bank":"SBI (111100987)"}
]

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'date', label: 'Date' },
  { id: 'amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'bank', label: 'Bank Details' },
];

const rowsPerPageOptions = [5, 10, 20];

export default function Transactions() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])
  const [enableDateFilter, setEnableDateFilter] = useState(false)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
        <Stack direction="row" justifyContent="space-between" alignItems='center' display='flex'>
            <Typography color="textSecondary" variant="h5" gutterBottom>
            Transactions
            </Typography>
            <Stack direction="row" justifyContent="right" alignItems='center' display='flex'>
            <Checkbox checked={enableDateFilter} onClick={()=>{setEnableDateFilter(!enableDateFilter)}} />
            <TextField
                margin="normal"
                disabled={!enableDateFilter}
                required
                autoFocus
                type="date"
                onInput={e => {
                console.log(e.target.value);
                }}
                onChange={e => {
                console.log(e.target.value);
                }}
                // value={bookingStartDateAndTime}
                InputLabelProps={{ shrink: true }}
            />
            </Stack>
        </Stack>

        <TableContainer>
            <Table>
                <TableHead>
                <TableRow>
                    {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                    <TableRow key={row.id}>
                        {columns.map((column) => (
                        <TableCell key={column.id}>{row[column.id]}</TableCell>
                        ))}
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => { setPage(newPage) }}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>

    
    </React.Fragment>
  )
}