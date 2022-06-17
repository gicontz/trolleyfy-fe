import React, { createContext } from 'react';

import { ToastState, ToastTypes } from '../api/toast/types';

export type TToastContext = {
  toastStore: ToastState;
  toastDispatch: (i: ToastTypes) => void;
}

export const defaultState: TToastContext = {
  toastStore: {
    pop: false,
    message: '',
    type: 'info',
  },
  toastDispatch: (toast: ToastTypes): void => {},
};

const toastContextProvider = createContext(defaultState);

export const useToastContext = (): TToastContext => React.useContext(toastContextProvider);

export default toastContextProvider;
