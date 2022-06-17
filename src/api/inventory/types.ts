import React from 'react';
import { Action, WithIsLoading } from '../../types/Misc';
import { ToastTypes } from '../toast/types';

export enum Actions {
  GET_ITEMS_START = '@cashier/GET_ITEMS_START',
  GET_ITEMS_REJECTED = '@cashier/GET_ITEMS_REJECTED',
  GET_ITEMS_FULFILLED = '@cashier/GET_ITEMS_FULFILLED',
  GET_ITEM_BYID_START = '@cashier/GET_ITEM_BYID_START',
  GET_ITEM_BYID_REJECTED = '@cashier/GET_ITEM_BYID_REJECTED',
  GET_ITEM_BYID_FULFILLED = '@cashier/GET_ITEM_BYID_FULFILLED',
  CREATE_ITEM_START = '@cashier/CREATE_ITEM_START',
  CREATE_ITEM_REJECTED = '@cashier/CREATE_ITEM_REJECTED',
  CREATE_ITEM_FULFILLED = '@cashier/CREATE_ITEM_FULFILLED',
  UPDATE_ITEM_START = '@cashier/UPDATE_ITEM_START',
  UPDATE_ITEM_REJECTED = '@cashier/UPDATE_ITEM_REJECTED',
  UPDATE_ITEM_FULFILLED = '@cashier/UPDATE_ITEM_FULFILLED',
  DELETE_ITEMS_START = '@cashier/DELETE_ITEMS_START',
  DELETE_ITEMS_REJECTED = '@cashier/DELETE_ITEMS_REJECTED',
  DELETE_ITEMS_FULFILLED = '@cashier/DELETE_ITEMS_FULFILLED',
}

export type TItemCategory =
  | 'canned-goods'
  | 'frozen-food'
  | 'essentials'
  | 'apparel'
  | 'meat'
  | 'vegetable'
  | 'fruit'
  | 'electronics'
  | 'hygiene';

export const ITEM_CATEGORIES: TItemCategory[] = [
  'apparel',
  'canned-goods',
  'electronics',
  'essentials',
  'fruit',
  'hygiene',
  'meat',
  'vegetable',
  'frozen-food',
];

export interface IItem {
  itemId: string;
  category: TItemCategory;
  qty: number;
  name: string;
  productCode: string;
  price: string;
  description: string;
};

export type TCreateItemData = Omit<IItem, 'itemId'>;
export type TUpdateItemData = IItem;

export interface InventoryState {
  itemList: WithIsLoading<IItem[]>;
  selectedItem: WithIsLoading<IItem>;
  toastDispatcher: React.Dispatch<ToastTypes>;
}

export type TGetAllItemsRequest = Action<typeof Actions.GET_ITEMS_START>;
type TGetAllItemsAction = Action<typeof Actions.GET_ITEMS_FULFILLED, IItem[]>;
type TGetAllItemsError = Action<typeof Actions.GET_ITEMS_REJECTED>;

export type TGetItemByIdRequest = Action<typeof Actions.GET_ITEM_BYID_START>;
type TGetItemByIdAction = Action<typeof Actions.GET_ITEM_BYID_FULFILLED, IItem>;
type TGetItemByIdError = Action<typeof Actions.GET_ITEM_BYID_REJECTED>;

export type TCreateItemRequest = Action<typeof Actions.CREATE_ITEM_START>;
type TCreateItemAction = Action<typeof Actions.CREATE_ITEM_FULFILLED, IItem>;
type TCreateItemError = Action<typeof Actions.CREATE_ITEM_REJECTED>;

export type TUpdateItemRequest = Action<typeof Actions.UPDATE_ITEM_START>;
type TUpdateItemAction = Action<typeof Actions.UPDATE_ITEM_FULFILLED, IItem>;
type TUpdateItemError = Action<typeof Actions.UPDATE_ITEM_REJECTED>;

export type TDeleteItemsRequest = Action<typeof Actions.DELETE_ITEMS_START>;
type TDeleteItemsAction = Action<typeof Actions.DELETE_ITEMS_FULFILLED, string[]>;
type TDeleteItemsError = Action<typeof Actions.DELETE_ITEMS_REJECTED>;

export type InventoryTypes =
  | TGetAllItemsRequest
  | TGetAllItemsAction
  | TGetAllItemsError
  | TGetItemByIdRequest
  | TGetItemByIdAction
  | TGetItemByIdError
  | TCreateItemRequest
  | TCreateItemAction
  | TCreateItemError
  | TUpdateItemRequest
  | TUpdateItemAction
  | TUpdateItemError
  | TDeleteItemsRequest
  | TDeleteItemsAction
  | TDeleteItemsError;
