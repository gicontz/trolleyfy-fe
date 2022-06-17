import { createContext, useContext } from 'react';

import { AppState, AppTypes } from '../api/app/types';

export const defaultState = {
  store: {
    repeatNum: 0,
    inputBoxes: 0,
    selectBoxes: 0,
    condBoxes: 0,
  } as AppState,
  dispatch: (a: AppTypes): void => {},
};

const appContext = createContext(defaultState);

export const useAppContext = (): typeof defaultState => useContext(appContext);

export default appContext;