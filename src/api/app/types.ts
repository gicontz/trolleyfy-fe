import { Action } from '../../types/Action';

export enum Actions {
    SET_REPEAT_NUM = 'SET_REPEAT_NUM',
    SET_INPUT_BOX_NUM = 'SET_INPUT_BOX_NUM',
    SET_SELECT_BOX_NUM = 'SET_SELECT_BOX_NUM',
    SET_CONDITIONAL_BOX_NUM = 'SET_CONDITIONAL_BOX_NUM'
};

export interface AppState {
    repeatNum: number;
    inputBoxes: number;
    selectBoxes: number;
    condBoxes: number;
};

export type SetRepeatNum = Action<typeof Actions.SET_REPEAT_NUM>;
export type SetInputBoxes = Action<typeof Actions.SET_INPUT_BOX_NUM>;
export type SetSelectBoxes = Action<typeof Actions.SET_SELECT_BOX_NUM>;
export type SetConditionalBoxes = Action<typeof Actions.SET_CONDITIONAL_BOX_NUM>;

export type AppTypes = SetRepeatNum | SetInputBoxes | SetSelectBoxes | SetConditionalBoxes;