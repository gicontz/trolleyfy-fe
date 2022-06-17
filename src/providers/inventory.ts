import React, { createContext } from 'react';

import { InventoryState, InventoryTypes } from '../api/inventory/types';

type TInventoryContext = {
  invStore: InventoryState;
  invDispatch: (i: InventoryTypes) => void;
}

export const defaultState: TInventoryContext = {
  invStore: {
    itemList: {
      record: [],
      isLoading: false,
    },
    selectedItem: {
      record: {
        itemId: '',
        name: '',
        description: '',
        category: 'apparel',
        qty: 0,
        productCode: '',
        price: '',
      },
      isLoading: false
    },
    toastDispatcher: () => null,
  },
  invDispatch: (inv: InventoryTypes): void => {},
};

const inventoryContextProvider = createContext(defaultState);

export const useInvContext = (): TInventoryContext => React.useContext(inventoryContextProvider);

export default inventoryContextProvider;
