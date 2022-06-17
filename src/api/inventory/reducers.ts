import { Actions, InventoryState, InventoryTypes } from './types';

export function inventory(state: InventoryState, action: InventoryTypes): InventoryState {
  switch (action.type) {
    case Actions.GET_ITEMS_START: {
      return {
        ...state,
        itemList: {
          record: [],
          isLoading: true,
        },
      };
    }
    case Actions.GET_ITEMS_FULFILLED: {
      return {
        ...state,
        itemList: {
          record: action.payload,
          isLoading: false,
        },
      };
    }
    case Actions.GET_ITEMS_REJECTED: {
      return {
        ...state,
        itemList: {
          record: [],
          isLoading: false,
        },
      };
    }
    case Actions.GET_ITEM_BYID_START: {
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          isLoading: true,
        }
      };
    }
    case Actions.GET_ITEM_BYID_FULFILLED: {
      return {
        ...state,
        selectedItem: {
          record: action.payload,
          isLoading: false,
        }
      };
    }
    case Actions.GET_ITEM_BYID_REJECTED: {
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          isLoading: false,
        }
      };
    }
    case Actions.CREATE_ITEM_START: {
      return {
        ...state,
        itemList: {
          ...state.itemList,
          isLoading: true,
        },
      };
    }
    case Actions.CREATE_ITEM_FULFILLED: {
      return {
        ...state,
        itemList: {
          record: [...state.itemList.record, {...action.payload}],
          isLoading: false,
        },
      };
    }
    case Actions.CREATE_ITEM_REJECTED: {
      return {
        ...state,
        itemList: {
          ...state.itemList,
          isLoading: false,
        },
      };
    }
    case Actions.UPDATE_ITEM_START: {
      return {
        ...state,
        itemList: {
          ...state.itemList,
          isLoading: true,
        },
      };
    }
    case Actions.UPDATE_ITEM_FULFILLED: {
      const updatedItem = action.payload;
      const itemIndx = [...state.itemList.record].findIndex((obj => obj.itemId === updatedItem.itemId));
      const record = [...state.itemList.record];
      record[itemIndx] = updatedItem;

      return {
        ...state,
        itemList: {
          record,
          isLoading: false,
        },
      };
    }
    case Actions.UPDATE_ITEM_REJECTED: {
      return {
        ...state,
        itemList: {
          ...state.itemList,
          isLoading: false,
        },
      };
    }
    case Actions.DELETE_ITEMS_START: {
      return {
        ...state,
        itemList: {
          ...state.itemList,
          isLoading: true,
        },
      };
    }
    case Actions.DELETE_ITEMS_FULFILLED: {
      const deletedIds = action.payload;
      const record = [...state.itemList.record].filter(({itemId}) => !deletedIds.includes(itemId));

      return {
        ...state,
        itemList: {
          record,
          isLoading: false,
        },
      };
    }
    case Actions.DELETE_ITEMS_REJECTED: {
      return {
        ...state,
        itemList: {
          ...state.itemList,
          isLoading: false,
        },
      };
    }
    default:
      return state;
  }
}
