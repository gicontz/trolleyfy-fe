import React, { createContext } from 'react';

import { CashierState, CashierTypes } from '../api/cashier/types';

type TCashierContext = {
  cashrStore: CashierState;
  cashrDispatch: (i: CashierTypes) => void;
}

export const defaultState: TCashierContext = {
  cashrStore: {
    currentPunchedItem: {
      itemId: '',
      name: 'N/A',
      description: 'N/A',
      category: 'apparel',
      qty: 0,
      productCode: 'N/A',
      price: 'N/A',
    },
    punchedItems: [],
    purchasedItems: [],
    barcode: {
      code: '',
      scanCount: 0,
    },
    toastInfo: {
      message: '',
      type: 'info',
      pop: false,
    },
    successOrder: {
      orderId: '6b3dg6gan23jdhsj23gsew',
      totalQty: 12,
      totalAmt: 200,
      paidAmt: 300,
      change: 100,
      createdAt: '',
    },
    orderList: {
      record: [],
      isLoading: false,
    },
    toastDispatcher: () => null,
  },
  cashrDispatch: (inv: CashierTypes): void => {},
};

const cashierContextProvider = createContext(defaultState);

export const useCashrContext = (): TCashierContext => React.useContext(cashierContextProvider);

export default cashierContextProvider;
