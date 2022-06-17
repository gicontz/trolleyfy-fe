import { TableHead } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getItems } from '../../api/inventory';
import { HeaderCell, TableCell, TableContainer, TableRow } from '../../components/table/TableComponents';
import InventoryContext from '../../providers/inventory';
import LinearProgress from '../../components/progress/LinearProgress';
import { useDialog } from '../../providers/dialog';
import ViewUpdateItem from '../../dialogs/inventory/ViewUpdateItem';
import { IItem } from '../../api/inventory/types';
import { genericFilter } from '../../helpers/search';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const InventoryTable: FunctionComponent = () => {
  const { invStore, invDispatch } = useContext(InventoryContext);
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);

  const [openDialog, closeDialog] = useDialog();

  const handleSearch = (s: string) => {
    const items = genericFilter<IItem>(s, invStore.itemList.record, Object.keys(invStore.itemList.record[0]));
    setFilteredItems([...items]);
  };

  const handleViewUpdate = (itemId: string) => () => {
    openDialog({
      children: <ViewUpdateItem itemId={itemId} onClose={closeDialog} />
    });
  };

  useEffect(() => {
    getItems(invDispatch);
  }, []);

  useEffect(() => {
    setFilteredItems([...invStore.itemList.record])
  }, [invStore.itemList.record]);

  return (
    <Container>
      <ContentContainer>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderCell>Product Code</HeaderCell>
                <HeaderCell>Product Name</HeaderCell>
                <HeaderCell>Unit Points</HeaderCell>
                <HeaderCell>Qty</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item, indx) => {
                return (
                  <TableRow key={indx}>
                    <TableCell component="th" scope="row" onClick={handleViewUpdate(item.itemId)}>
                      {item.productCode}
                    </TableCell>
                    <TableCell component="th" scope="row" onClick={handleViewUpdate(item.itemId)}>
                      {item.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.price} pts
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.qty}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        { invStore.itemList.isLoading && <LinearProgress />}
      </ContentContainer>
    </Container>
  )
};

export default InventoryTable;
