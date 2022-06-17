import React, { useReducer } from 'react';

import { api } from '../../helpers/api';
import { defaultState } from '../../providers/inventory';
import { popToast } from '../toast';
import { ToastTypes } from '../toast/types';
import { inventory } from './reducers';
import { Actions, TCreateItemData, InventoryState, InventoryTypes, TUpdateItemData } from './types';

const initialState: InventoryState = defaultState.invStore;

export type inventoryDispatch = React.Dispatch<InventoryTypes>;

type Dispatcher = {
  inv: React.Dispatch<InventoryTypes>;
  toast: React.Dispatch<ToastTypes>;
};

export const useInventory = (): [InventoryState, React.Dispatch<InventoryTypes>] => {
  const [state, dispatch] = useReducer(inventory, initialState);
  return [state, dispatch];
};

export const getItems = async (dispatch: React.Dispatch<InventoryTypes>): Promise<void> => {
  dispatch({ type: Actions.GET_ITEMS_START, payload: undefined });
  try {
    const { data } = await api({
      url: `/inventory`,
      method: 'get',
    });

    const items = data.records;

    dispatch({ type: Actions.GET_ITEMS_FULFILLED, payload: items });
  } catch (e) {
    dispatch({ type: Actions.GET_ITEMS_REJECTED, payload: undefined });
  }
};

export const getItemById = async (params: string, dispatch: React.Dispatch<InventoryTypes>): Promise<void> => {
  const itemId = params;
  dispatch({ type: Actions.GET_ITEM_BYID_START, payload: undefined });
  try {
    const { data } = await api({
      url: `/inventory/item?itemId=${itemId}`,
      method: 'get',
    });

    const item = data.data;

    dispatch({ type: Actions.GET_ITEM_BYID_FULFILLED, payload: item });
  } catch (e) {
    dispatch({ type: Actions.GET_ITEM_BYID_REJECTED, payload: undefined });
  }
};

export const createItem = async (params: TCreateItemData, dispatch: React.Dispatch<InventoryTypes>): Promise<void> => {
  dispatch({ type: Actions.CREATE_ITEM_START, payload: undefined });
  try {
    const { data } = await api({
      url: `/inventory/create`,
      method: 'post',
      data: params,
    });

    const newItem = data.data.data;

    dispatch({ type: Actions.CREATE_ITEM_FULFILLED, payload: newItem });
  } catch (e) {
    dispatch({ type: Actions.CREATE_ITEM_REJECTED, payload: undefined });
  }
};

export const updateItem = async (params: TUpdateItemData, dispatch: React.Dispatch<InventoryTypes>): Promise<void> => {
  const data = {...params};
  delete (data as Partial<TUpdateItemData>).itemId;

  dispatch({ type: Actions.UPDATE_ITEM_START, payload: undefined });
  try {
    await api({
      url: `/inventory/${params.itemId}`,
      method: 'patch',
      data,
    });

    dispatch({ type: Actions.UPDATE_ITEM_FULFILLED, payload: params });
  } catch (e) {
    dispatch({ type: Actions.UPDATE_ITEM_REJECTED, payload: undefined });
  }
};

export const deleteItems = async (params: string[], dispatch: Dispatcher): Promise<void> => {
  const { inv, toast } = dispatch;
  inv({ type: Actions.DELETE_ITEMS_START, payload: undefined });
  try {
    await api({
      url: `/inventory/delete/multiple`,
      method: 'post',
      data: {
        itemIds: params
      },
    });

    inv({ type: Actions.DELETE_ITEMS_FULFILLED, payload: params });
  } catch (e: any) {
    popToast({ message: e.response.data.message, type: 'warning'}, toast);
    inv({ type: Actions.DELETE_ITEMS_REJECTED, payload: undefined });
  }
};
