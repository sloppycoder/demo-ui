/* eslint-disable no-script-url */

import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";

import Title from "./Title";

// Generate Order Data
function createData(accountId, accountName, ledgerBalance, currency) {
  return {
    id: accountId,
    accountId,
    accountName,
    ledgerBalance,
    currency
  };
}

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.eventSource = new EventSource("/events/");
    this.state = {
      accounts: new Map()
    };
  }

  accountUpdated = val => {
    let newAccounts = new Map(this.state.accounts);
    newAccounts.set(
      val.accountId,
      createData(val.accountId, val.nickname, val.ledgerBalance, val.currency)
    );

    this.setState({ accounts: newAccounts });
  };

  componentDidMount() {
    this.eventSource.onmessage = e => {
      if (e.data !== "{}") {
        this.accountUpdated(JSON.parse(e.data));
      }
    };
  }

  render() {
    let accounts = this.state.accounts;
    let rows = [];
    accounts.forEach(acc => rows.push(acc));

    return (
      <Container>
        <Title>Recent Updated Accounts</Title>
        <div>
          <CircularProgress />
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Account Id</TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell>Currency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(acc => (
              <TableRow key={acc.accountId}>
                <TableCell>{acc.accountId}</TableCell>
                <TableCell>{acc.accountName}</TableCell>
                <TableCell align="right">{acc.ledgerBalance}</TableCell>
                <TableCell>{acc.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}
