/* eslint-disable no-script-url */

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(
  id,
  accountId,
  accountName,
  balance,
  currency,
  lastUpdated
) {
  return { id, accountId, accountName, balance, currency, lastUpdated };
}

const rows = [
  createData(0, "1111", "Saving", 123.44, "THB", "2019-10-10 00:10:01"),
  createData(1, "2222", "Current", 1123.44, "THB", "2019-10-11 12:10:01")
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Updated Accounts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account Number</TableCell>
            <TableCell>Account Name</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.accountId}</TableCell>
              <TableCell>{row.accountName}</TableCell>
              <TableCell>{row.balance}</TableCell>
              <TableCell>{row.currency}</TableCell>
              <TableCell align="right">{row.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          ...
        </Link>
      </div>
    </React.Fragment>
  );
}
