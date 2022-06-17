import React, { useReducer } from 'react';

import { api } from '../../helpers/api';
import { defaultState } from '../../providers/cashier';
import { popToast } from '../toast';
import { ToastTypes } from '../toast/types';
import { cashier } from './reducers';
import { Actions, TPunchItemData, CashierState, CashierTypes, TCreateOrderData } from './types';

const initialState: CashierState = defaultState.cashrStore;

export type inventoryDispatch = React.Dispatch<CashierTypes>;

type Dispatcher = {
  cashier: React.Dispatch<CashierTypes>;
  toast: React.Dispatch<ToastTypes>;
};

export const useCashier = (): [CashierState, React.Dispatch<CashierTypes>] => {
  const [state, dispatch] = useReducer(cashier, initialState);
  return [state, dispatch];
};

export const punchItem = async (params: TPunchItemData, dispatch: Dispatcher): Promise<void> => {
  const { productCode } = params;
  const { cashier, toast } = dispatch;
  cashier({ type: Actions.PUNCH_ITEM_START, payload: undefined });
  try {
    const { data } = await api({
      url: `/inventory/item?productCode=${productCode}`,
      method: 'get',
    });

    const item = data.data;

    cashier({ type: Actions.PUNCH_ITEM_FULFILLED, payload: item });
  } catch (e) {
    cashier({ type: Actions.PUNCH_ITEM_REJECTED, payload: undefined });
  }
};

export const setBarcode = (params: string, dispatch: React.Dispatch<CashierTypes>): void => {
  dispatch({ type: Actions.SET_BARCODE_ACTION, payload: params });
};

export const getOrders = async (dispatch: Dispatcher) => {
  const { cashier, toast } = dispatch;
  cashier({ type: Actions.GET_ORDER_HIST_START, payload: undefined });
  try {
    const { data } = await api({
      url: `/order`,
      method: 'get',
    });

    const orders = data.orders;

    cashier({ type: Actions.GET_ORDER_HIST_FULFILLED, payload: orders });
  } catch (e) {
    cashier({ type: Actions.GET_ORDER_HIST_REJECTED, payload: undefined });
    popToast({ message: `Error while fetching order history`, type: 'error' }, toast);
  }
}

export const clearPunchedItems = (dispatch: Dispatcher): void => {
  const { cashier, toast } = dispatch;
  cashier({ type: Actions.CLEAR_PUNCH_ITEMS_ACTION, payload: undefined });
  popToast({message: 'Ready for new Transaction', type: 'info'}, toast);
};

export const createOrder = async (params: TCreateOrderData, dispatch: Dispatcher): Promise<void> => {
  const { cashier, toast } = dispatch;
  cashier({ type: Actions.CREATE_ORDER_START, payload: undefined });
  try {
    const { data } = await api({
      url: `/order/create`,
      method: 'post',
      data: params,
    });

    const item = data.order;

    cashier({ type: Actions.CREATE_ORDER_FULFILLED, payload: item });
    popToast({ message: 'Order created Succesfully', type: 'info' }, toast);
  } catch (e: any) {
    popToast({ message: e.response.data.message, type: 'error' }, toast);
    cashier({ type: Actions.CREATE_ORDER_REJECTED, payload: undefined });
  }
};
