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
function createData(accountId, accountName, balance, currency, changed) {
  return {
    id: accountId,
    accountId,
    accountName,
    balance,
    currency,
    changed
  };
}

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.eventSource = new EventSource("http://localhost:3102/events/");

    this.state = {
      accounts: new Map()
    };
  }

  accountUpdated = val => {
    // hack some name into the list for demo only
    switch (val.account_id) {
      case "100025841135":
        val.nickname = "K. Somkid";
        break;
      case "5010060280":
        val.nickname = "Srinivasan";
        break;
      case "100032418035":
        val.nickname = "Li Lin";
        break;
      default:
        break;
    }

    let newAccounts = new Map(this.state.accounts);

    let acc = createData(
      val.account_id,
      val.nickname,
      val.balances[0].amount,
      val.currency,
      true
    );

    newAccounts.set(val.account_id, acc);

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
                <TableCell align="right">{acc.balance}</TableCell>
                <TableCell>{acc.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}
