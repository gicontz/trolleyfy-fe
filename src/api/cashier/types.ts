import { Action } from '../../types/Misc';
import { IItem } from '../inventory/types';
import { ToastState, ToastTypes } from '../toast/types';

export enum Actions {
  PUNCH_ITEM_START = '@cashier/PUNCH_ITEM_START',
  PUNCH_ITEM_REJECTED = '@cashier/PUNCH_ITEM_REJECTED',
  PUNCH_ITEM_FULFILLED = '@cashier/PUNCH_ITEM_FULFILLED',
  CREATE_ORDER_START = '@cashier/CREATE_ORDER_START',
  CREATE_ORDER_REJECTED = '@cashier/CREATE_ORDER_REJECTED',
  CREATE_ORDER_FULFILLED = '@cashier/CREATE_ORDER_FULFILLED',
  SET_BARCODE_ACTION = '@cashier/SET_BARCODE_ACTION',
  CLEAR_PUNCH_ITEMS_ACTION = '@cashier/CLEAR_PUNCH_ITEMS_ACTION',
  GET_ORDER_HIST_START = '@cashier/GET_ORDER_HIST_START',
  GET_ORDER_HIST_REJECTED = '@cashier/GET_ORDER_HIST_REJECTED',
  GET_ORDER_HIST_FULFILLED = '@cashier/GET_ORDER_HIST_FULFILLED',
}

export type TPunchItemData = Pick<IItem, 'productCode'>;

export interface WithIsLoading<T> {
  record: T;
  isLoading: boolean;
}

export type BarcodeState = {
  code: string;
  scanCount: number;
};

export type TItemOrder = {
  itemId: string;
  qty: number;
  itemName?: string;
  itemDesc?: string;
  productCode?: string;
};

export interface IOrder {
  orderId: string;
  items: TItemOrder[];
  totalQty: number;
  totalAmt: number;
  paidAmt: number;
  change: number;
  createdAt: string;
};

export type TCreateOrderData = {
  items: TItemOrder[];
  paidAmt: number;
};

export interface IPurchasedItem extends IItem {
  pqty: number;
  amt: number;
};

export interface CashierState {
  currentPunchedItem: IItem;
  barcode: BarcodeState;
  punchedItems: IItem[];
  purchasedItems: IPurchasedItem[];
  isPurchasing?: boolean;
  successOrder: Omit<IOrder, 'items'>;
  orderList: WithIsLoading<IOrder[]>;
  toastInfo: ToastState;
  toastDispatcher: React.Dispatch<ToastTypes>;
}

export type TPunchItemRequest = Action<typeof Actions.PUNCH_ITEM_START>;
type TPunchItemAction = Action<typeof Actions.PUNCH_ITEM_FULFILLED, IItem>;
type TPunchItemError = Action<typeof Actions.PUNCH_ITEM_REJECTED>;

export type TCreateOrderRequest = Action<typeof Actions.CREATE_ORDER_START>;
type TCreateOrderAction = Action<typeof Actions.CREATE_ORDER_FULFILLED, IOrder>;
type TCreateOrderError = Action<typeof Actions.CREATE_ORDER_REJECTED>;

export type TGetOrderHistRequest = Action<typeof Actions.GET_ORDER_HIST_START>;
type TGetOrderHistAction = Action<typeof Actions.GET_ORDER_HIST_FULFILLED, IOrder[]>;
type TGetOrderHistError = Action<typeof Actions.GET_ORDER_HIST_REJECTED>;

type TSetBarcodeAction = Action<typeof Actions.SET_BARCODE_ACTION, string>;
type TClearPunchedItemsAction = Action<typeof Actions.CLEAR_PUNCH_ITEMS_ACTION>;

export type CashierTypes =
  | TPunchItemRequest
  | TPunchItemAction
  | TPunchItemError
  | TSetBarcodeAction
  | TCreateOrderRequest
  | TCreateOrderAction
  | TCreateOrderError
  | TClearPunchedItemsAction
  | TGetOrderHistRequest
  | TGetOrderHistAction
  | TGetOrderHistError;
