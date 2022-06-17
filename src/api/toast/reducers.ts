import { Actions, ToastState, ToastTypes } from './types';

export function toast(state: ToastState, action: ToastTypes): ToastState {
  switch (action.type) {
    case Actions.POP_TOAST_ACTION: {
      return {
        ...state,
        pop: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    }
    case Actions.POP_TOAST_EXIT: {
      return {
        ...state,
        pop: false,
        message: '',
        type: 'info',
      };
    }
    default:
      return state;
  }
}
