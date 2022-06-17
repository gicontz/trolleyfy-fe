import { TableHead } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HeaderCell, TableCell, TableContainer, TableRow } from '../../components/table/TableComponents';
import LinearProgress from '../../components/progress/LinearProgress';
import { useDialog } from '../../providers/dialog';
import { genericFilter } from '../../helpers/search';
import { useCashrContext } from '../../providers/cashier';
import { IOrder } from '../../api/cashier/types';
import { getOrders } from '../../api/cashier';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 90%;
`;

const InventoryTable: FunctionComponent = () => {
  const { cashrStore, cashrDispatch } = useCashrContext();
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);

  const handleSearch = (s: string) => {
    const orders = genericFilter<IOrder>(s, cashrStore.orderList.record, Object.keys(cashrStore.orderList.record[0]));
    setFilteredOrders([...orders]);
  };

  useEffect(() => {
    getOrders({ cashier: cashrDispatch, toast: cashrStore.toastDispatcher });
  }, []);

  useEffect(() => {
    setFilteredOrders([...cashrStore.orderList.record])
  }, [cashrStore.orderList.record]);

  return (
    <Container>
      <ContentContainer>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderCell>Order Id</HeaderCell>
                <HeaderCell>Order DateTime</HeaderCell>
                <HeaderCell>Total Amount</HeaderCell>
                <HeaderCell>Total Qty</HeaderCell>
                <HeaderCell>Amount Paid</HeaderCell>
                <HeaderCell>Change</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order, indx) => {
                return (
                  <TableRow key={indx}>
                    <TableCell component="th" scope="row">
                      {order.orderId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.createdAt}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.totalAmt} pts
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.totalQty}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.paidAmt} pts
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.change} pts
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        { cashrStore.orderList.isLoading && <LinearProgress />}
      </ContentContainer>
    </Container>
  )
};

export default InventoryTable;
