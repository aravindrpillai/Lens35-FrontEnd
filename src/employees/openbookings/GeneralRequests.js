import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function GeneralRequests() {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell>12/12/2022</TableCell>
            <TableCell>aaaa</TableCell>
            <TableCell>nbbbb</TableCell>
            <TableCell>cccc</TableCell>
            <TableCell align="right">1000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
