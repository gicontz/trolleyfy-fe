import React, { FunctionComponent, useState } from 'react';
import { TCreateItemData } from '../../api/inventory/types';
import { ActionContainer, ActionButton } from '../../components/Button';
import { DialogContainer as FsDialogContainer } from '../../components/DialogComponets';
import HelperField from '../../components/fields/HelperField';
import styled from 'styled-components';
import { createItem } from '../../api/inventory';
import { useInvContext } from '../../providers/inventory';

interface Props {
  onClose?: () => void;
}

const DialogContainer = styled(FsDialogContainer)`
  width: 400px;
`;

const NewItem: FunctionComponent<Props> = ({onClose}) => {
  const { invStore, invDispatch } = useInvContext();
  const [item, setItem] = useState<TCreateItemData>({
    name: '',
    description: '',
    category: 'apparel',
    qty: 0,
    productCode: '',
    price: '',
  });

  const handleInputChange = (name: string, value: string) => {
    if (name === 'qty') {
      setItem({...item, [name]: parseInt(value === '' ? '0' : value)});
      return;
    }
    setItem({...item, [name]: value});
  }

  const handleCreateItem = () => {
    createItem(item, invDispatch);
    if (typeof onClose === 'function') onClose();
  }

  return (
    <DialogContainer title="New Item" onClose={onClose}>
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
        <ActionButton layout="fill" onClick={handleCreateItem}>
          Add
        </ActionButton>
      </ActionContainer>
    </DialogContainer>
  )
};

export default NewItem;
