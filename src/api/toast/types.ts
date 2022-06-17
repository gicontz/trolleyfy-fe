import { AppearanceTypes } from 'react-toast-notifications';
import { Action } from '../../types/Misc';

export enum Actions {
  POP_TOAST_ACTION = '@cashier/POP_TOAST_FULFILLED',
  POP_TOAST_EXIT = '@cashier/POP_TOAST_EXIT',
}

export interface ToastState {
  pop: boolean;
  message: string;
  type: AppearanceTypes;
}

export type TPopToastAction = Action<typeof Actions.POP_TOAST_ACTION, Omit<ToastState, 'pop'>>;
export type TPopToastExit = Action<typeof Actions.POP_TOAST_EXIT>;

export type ToastTypes = TPopToastAction | TPopToastExit;
