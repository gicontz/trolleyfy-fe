import { TableHead } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteItems, getItems } from '../api/inventory';
import { HeaderCell, TableCell, TableContainer, TableRow } from '../components/table/TableComponents';
import { CheckBox } from '../components/checkbox/CheckBox';
import { IconBtn } from '../components/Button';
import InventoryContext from '../providers/inventory';
import Icons from '../assets/icons/Icons';
import SearchField from '../components/fields/SearchField';
import LinearProgress from '../components/progress/LinearProgress';
import { useDialog } from '../providers/dialog';
import NewItem from '../dialogs/inventory/NewItem';
import ViewUpdateItem from '../dialogs/inventory/ViewUpdateItem';
import DeleteConfirmation from '../dialogs/common/DeleteConfirmation';
import { IItem } from '../api/inventory/types';
import { genericFilter } from '../helpers/search';

const { PlusIcon, TrashIcon } = Icons;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > .right-side {
    display: flex;
    align-items: center;
  }
`;

type ItemOption = {
  id: string;
  checked: boolean;
}

const InventoryView: FunctionComponent = () => {
  const { invStore, invDispatch } = useContext(InventoryContext);
  const [checkItems, setCheckItems] = useState<ItemOption[]>([{
      id: 'all',
      checked: false
    }
  ]);
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);

  const selectedItems = checkItems.filter(({checked}) => checked);

  const [openDialog, closeDialog] = useDialog();

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const id = e.target.name;
    if (id === 'all') {
      setCheckItems([...checkItems.map((c) => ({ ...c, checked: checked }))]);
    } else {
      const checkIndx = checkItems.findIndex((obj => obj.id === id));
      const newCheckitems = checkItems;
      newCheckitems[0].checked = false;
      newCheckitems[checkIndx].checked = checked;
      setCheckItems([...newCheckitems]);
    }
  };

  const handleNewItem = () => {
    openDialog({
      children: <NewItem onClose={closeDialog} />
    })
  };

  const handleDeleteItems = () => {
    deleteItems(selectedItems.filter(({id})=> id !== 'all').map(({id}) => id), { inv: invDispatch, toast: invStore.toastDispatcher });
    closeDialog();
  }

  const handleConfirmDelete = () => {
    openDialog({
      children: <DeleteConfirmation onCancel={closeDialog} onDelete={handleDeleteItems} />
    })
  };

  const handleSearch = (s: string) => {
    const items = genericFilter<IItem>(s, invStore.itemList.record, Object.keys(invStore.itemList.record[0]));
    setFilteredItems([...items]);
  };

  const handleViewUpdate = (itemId: string) => () => {
    openDialog({
      children: <ViewUpdateItem itemId={itemId} onClose={closeDialog} />
    })
  };

  useEffect(() => {
    getItems(invDispatch);
  }, []);

  useEffect(() => {
    setCheckItems([{
        id: 'all',
        checked: false
      },
      ...invStore.itemList.record.map((itm) => ({
        id: itm.itemId,
        checked: false,
      }))
    ]);
    setFilteredItems([...invStore.itemList.record])
  }, [invStore.itemList.record]);

  return (
    <Container>
      <HeaderContainer>
        <div className="left-side">
          <h2>Inventory</h2>
        </div>
        <div className="right-side">
          {
            selectedItems.length > 0 &&
            <IconBtn shade="light" onClick={handleConfirmDelete}>
              <TrashIcon />
            </IconBtn>
          }
          <IconBtn onClick={handleNewItem}>
            <PlusIcon />
          </IconBtn>
          <SearchField onChange={handleSearch}/>
        </div>
      </HeaderContainer>
      <ContentContainer>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderCell>
                  <CheckBox checked={checkItems[0].checked} name="all" onChange={handleSelect}/>
                </HeaderCell>
                <HeaderCell>Product Code</HeaderCell>
                <HeaderCell>Product Name</HeaderCell>
                <HeaderCell>Product Description</HeaderCell>
                <HeaderCell>Unit Points</HeaderCell>
                <HeaderCell>Quantity</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item, indx) => {
                const { checked, name } = {
                  checked: checkItems[indx+1] ? checkItems[indx+1].checked : false,
                  name: item.itemId
                };

                return (
                  <TableRow key={indx}>
                    <TableCell>
                      <CheckBox checked={checked} name={name} onChange={handleSelect}/>
                    </TableCell>
                    <TableCell component="th" scope="row" onClick={handleViewUpdate(item.itemId)}>
                      {item.productCode}
                    </TableCell>
                    <TableCell component="th" scope="row" onClick={handleViewUpdate(item.itemId)}>
                      {item.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.price} Php
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

export default InventoryView;
