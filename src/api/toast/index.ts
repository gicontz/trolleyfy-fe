import React, { useReducer } from 'react';

import { defaultState } from '../../providers/toast';
import { toast } from './reducers';
import { Actions, ToastTypes, ToastState } from './types';

const initialState: ToastState = defaultState.toastStore;

export type inventoryDispatch = React.Dispatch<ToastTypes>;

export const useToast = (): [ToastState, React.Dispatch<ToastTypes>] => {
  const [state, dispatch] = useReducer(toast, initialState);
  return [state, dispatch];
};

export const popToast = (params: Omit<ToastState, 'pop'>, dispatch: React.Dispatch<ToastTypes>): void => {
  dispatch({ type: Actions.POP_TOAST_ACTION, payload: params });
  setTimeout(() => dispatch({ type: Actions.POP_TOAST_EXIT, payload: undefined }), 1000);
};
