import React from 'react';
import styled from 'styled-components';
import { TableCell as MuiTableCell, TableContainer as MuiTableContainer, TableRow as MuiTableRow } from '@material-ui/core'

export const TableContainer = styled(MuiTableContainer)`
  position: relative;
  max-height: 800px;
  border-radius: 26px;
  background-color: white;
  max-height: 360px;
  overflow: auto;
  > table {
    min-height: 37px;
  }
`;

export const HeaderCell = styled(({...other}) => (
  <MuiTableCell align="center" {...other} classes={{head: 'head'}} />
))`
  &.head {
    background-color: #EB448C;
    padding: 0;
    font-size: 12px;
    font-family: Lato, sans-serif;
    height: 25px;
    color: white;
    z-index: 1;
  }
`;

export const TableCell = styled(({...other}) => <MuiTableCell align="center" {...other} />)`
  color: black;
  font-size: 12px !important;
`;

export const TableRow = styled(MuiTableRow)`
  cursor: pointer;
  &:hover {
    background-color: #F2F2F2;
  }
`;
