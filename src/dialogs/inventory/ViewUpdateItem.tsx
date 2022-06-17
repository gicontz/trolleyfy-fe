import React, { FunctionComponent, useEffect, useState } from 'react';
import { TUpdateItemData } from '../../api/inventory/types';
import { ActionContainer, ActionButton } from '../../components/Button';
import { DialogContainer as FsDialogContainer } from '../../components/DialogComponets';
import HelperField from '../../components/fields/HelperField';
import styled from 'styled-components';
import { getItemById, updateItem } from '../../api/inventory';
import { defaultState, useInvContext } from '../../providers/inventory';
import LoadingOverlay from '../../components/progress/LoadingOverlay';

interface Props {
  itemId: string;
  onClose?: () => void;
}

const DialogContainer = styled(FsDialogContainer)`
  width: 400px;
`;

const ViewUpdateItem: FunctionComponent<Props> = ({ itemId, onClose }) => {
  const { invStore, invDispatch } = useInvContext();
  const [item, setItem] = useState<TUpdateItemData>(defaultState.invStore.selectedItem.record);

  const handleInputChange = (name: string, value: string) => {
    if (name === 'qty') {
      setItem({...item, [name]: parseInt(value === '' ? '0' : value)});
      return;
    }
    setItem({...item, [name]: value});
  }

  const handleUpdateItem = () => {
    updateItem(item, invDispatch);
    if (typeof onClose === 'function') onClose();
  }

  useEffect(() => {
    getItemById(itemId, invDispatch);
  }, []);


  useEffect(() => {
    const theItem = invStore.selectedItem.record;
    const { name, description, category, qty, productCode, price } = theItem;
    setItem({
        itemId,
        name,
        description,
        category,
        qty,
        productCode,
        price,
      });
  }, [invStore.selectedItem.record]);

  return (
    <DialogContainer title="View/Update Item" onClose={onClose}>
      <HelperField
        name="productCode"
        labelName="Product Code"
        value={item.productCode}
        onChange={handleInputChange}
        placeholder="Input Product Code"
        important
      />
      <HelperField
        name="name"
        labelName="Product Name"
        value={item.name}
        onChange={handleInputChange}
        placeholder="Input Product Name"
        important
      />
      <HelperField
        name="description"
        labelName="Product Description"
        value={item.description}
        onChange={handleInputChange}
        placeholder="Input Product Description"
        important
      />
      <HelperField
        name="price"
        labelName="Unit Points"
        value={item.price}
        onChange={handleInputChange}
        placeholder="Input Unit Points"
        important
      />
      <HelperField
        name="qty"
        labelName="Quantity"
        value={item.qty.toString()}
        onChange={handleInputChange}
        placeholder="Input Quantity"
        important
      />
      <ActionContainer>
        <ActionButton layout="outline">
          Reset
        </ActionButton>
        <ActionButton layout="fill" onClick={handleUpdateItem}>
          Update
        </ActionButton>
      </ActionContainer>
      <LoadingOverlay display={invStore.selectedItem.isLoading} />
    </DialogContainer>
  )
};

export default ViewUpdateItem;
