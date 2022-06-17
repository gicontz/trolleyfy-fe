import React, { FunctionComponent, RefObject, useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { BrowserRouter  } from 'react-router-dom';
import { useCashier, setBarcode as setBarcodeAction } from './api/cashier';
import { useInventory } from './api/inventory';
import MainView from './views/MainView';
import InventoryContext from './providers/inventory';
import CashierContext from './providers/cashier';
import theme from './styles/theme/themes';
import DialogProvider from './providers/dialog';
import ToastProvider from './components/ToastProvider';
import { useToast } from './api/toast';

const BarcodeReader = styled.div`
  width: 100%;
  height: 100%;
`;

const Root: FunctionComponent = () => {
  const [toastStore, toastDispatcher] = useToast();
  const [barcode, setBarcode] = useState('');
  const [invStore, invDispatch] = useInventory();
  const [cashrStore, cashrDispatch] = useCashier();
  const barcodeDiv = useRef<HTMLDivElement>();

  useEffect(() => {
    if (barcodeDiv.current)barcodeDiv.current.focus();
  }, [barcodeDiv.current]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setBarcodeAction(barcode, cashrDispatch);
      setBarcode('');
      return;
    }
    setBarcode(`${barcode}${e.key}`);
  }

  return (
    <ThemeProvider theme={theme.default}>
      <ToastProvider value={{ toastStore, toastDispatch: toastDispatcher }}>
        <InventoryContext.Provider value={{ invStore: {...invStore, toastDispatcher }, invDispatch }}>
          <CashierContext.Provider value={{ cashrStore: {...cashrStore, toastDispatcher }, cashrDispatch }}>
            <BarcodeReader onKeyPress={handleKeyPress} tabIndex={-1} ref={barcodeDiv as RefObject<HTMLDivElement>}>
              <DialogProvider>
                <BrowserRouter>
                  <MainView />
                </BrowserRouter>
              </DialogProvider>
            </BarcodeReader>
          </CashierContext.Provider>
        </InventoryContext.Provider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Root;
