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
function createData(
  id,
  accountId,
  accountName,
  balance,
  currency,
  lastUpdated,
  changed
) {
  return {
    id,
    accountId,
    accountName,
    balance,
    currency,
    lastUpdated,
    changed
  };
}

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  fetchTopAccounts = async () => {
    const response = await fetch("/api/top/18");
    const payload = await response.json();
    console.log(payload);

    const oldRows = this.state.rows;

    if (payload.hasOwnProperty("accounts")) {
      let newRows = [];
      for (var val of payload.accounts) {
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
        let bal = val.balances[0];
        let changed = true;

        for (var old of oldRows) {
          //console.log(old);
          if (old.accountId === val.account_id && old.balance === bal.amount) {
            changed = false;
          }
        }

        let account = createData(
          val.account_id,
          val.account_id,
          val.nickname,
          bal.amount,
          val.currency,
          bal.last_updated,
          changed
        );
        newRows.push(account);
      }

      this.setState({ rows: newRows });
    }
  };

  componentDidMount() {
    this.interval = setInterval(() => this.fetchTopAccounts(), 1500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let rows = this.state.rows;
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
              <TableCell align="right">Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} selected={row.changed}>
                <TableCell>{row.accountId}</TableCell>
                <TableCell>{row.accountName}</TableCell>
                <TableCell align="right">{row.balance}</TableCell>
                <TableCell>{row.currency}</TableCell>
                <TableCell align="right">{row.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}
