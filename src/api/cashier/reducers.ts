import { Actions, CashierState, CashierTypes } from './types';
import { groupPurchases } from '../../helpers/group';
import { defaultState } from '../../providers/cashier';


export function cashier(state: CashierState, action: CashierTypes): CashierState {
  switch (action.type) {
    case Actions.PUNCH_ITEM_START: {
      return {
        ...state,
        toastInfo: defaultState.cashrStore.toastInfo,
      }
    }
    case Actions.PUNCH_ITEM_FULFILLED: {
      const item = action.payload;
      const curPurchItems = state.purchasedItems;
      const purchedItem = curPurchItems.find((obj) => obj.itemId === item.itemId);
      const itemQty = purchedItem ? purchedItem.pqty + 1 : 0;
      const isAvailable = itemQty <= item.qty;

      if (isAvailable) {
        return {
          ...state,
          currentPunchedItem: action.payload,
          punchedItems: [...state.punchedItems, {...action.payload}],
          purchasedItems: groupPurchases([...state.punchedItems, {...action.payload}]),
        };
      } else {
        return {
          ...state,
          toastInfo: { message: 'Out of Stock, Replenish first!', type: 'error', pop: true }
        }
      }
    }
    case Actions.CREATE_ORDER_FULFILLED: {
      return {
        ...state,
        successOrder: action.payload,
      }
    }
    case Actions.SET_BARCODE_ACTION: {
      return {
        ...state,
        barcode: {
          code: action.payload,
          scanCount: state.barcode.scanCount + 1,
        },
      };
    }
    case Actions.CLEAR_PUNCH_ITEMS_ACTION: {
      return {
        ...state,
        currentPunchedItem: defaultState.cashrStore.currentPunchedItem,
        punchedItems: defaultState.cashrStore.punchedItems,
        purchasedItems: defaultState.cashrStore.purchasedItems,
      };
    }
    case Actions.GET_ORDER_HIST_START: {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          isLoading: true,
        }
      }
    }
    case Actions.GET_ORDER_HIST_FULFILLED: {
      return {
        ...state,
        orderList: {
          record: action.payload,
          isLoading: false,
        }
      }
    }
    case Actions.GET_ORDER_HIST_REJECTED: {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          isLoading: false,
        }
      }
    }
    default:
      return state;
  }
}
