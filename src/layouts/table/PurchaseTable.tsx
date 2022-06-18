import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Table, TableHead, TableBody } from '@material-ui/core';
import { HeaderCell, TableCell, TableContainer, TableRow } from '../../components/table/TableComponents';
import { useCashrContext } from '../../providers/cashier';
import { IItem } from '../../api/inventory/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const StyledTableContainer = styled(TableContainer)`
  max-height: 275px
`;


const PurchaseTable: FunctionComponent = () => {
  const { cashrStore: store, cashrDispatch: dispatch } = useCashrContext();

  const handleViewUpdate = (id: string) => () => {

  }

  return (
    <Container>
      <ContentContainer>
        <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderCell>Product Code</HeaderCell>
                <HeaderCell>Product Name</HeaderCell>
                <HeaderCell>Quantity</HeaderCell>
                <HeaderCell>Amnt</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.purchasedItems.map((item, indx) => {
                return (
                  <TableRow key={indx}>
                    <TableCell component="th" scope="row" onClick={handleViewUpdate(item.itemId)}>
                      {item.productCode}
                    </TableCell>
                    <TableCell component="th" scope="row" onClick={handleViewUpdate(item.itemId)}>
                      {item.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.pqty}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.amt} Php
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </ContentContainer>
    </Container>
  )
}


export default PurchaseTable;
