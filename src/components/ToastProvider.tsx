import React, { FunctionComponent, useEffect } from 'react';
import { ToastProvider as RTNToastProvider, useToasts } from 'react-toast-notifications';
import CustomToastProvider, {TToastContext, useToastContext } from '../providers/toast';

interface Props {
  children: React.ReactNode;
  value: TToastContext;
}

const Toaster: FunctionComponent = () => {
  const { addToast } = useToasts();
  const { toastStore } = useToastContext();
  const { pop, message, type } = toastStore;

  useEffect(() => {
    if (pop) addToast(message, { appearance: type, autoDismiss: true });
  }, [pop]);

  return (
    <></>
  )
}

const ToastProvider: FunctionComponent<Props> = ({ children, value }) => {
  return (
    <CustomToastProvider.Provider value={value}>
      <RTNToastProvider placement={'bottom-right'} autoDismissTimeout={5000}>
        {children}
        <Toaster />
      </RTNToastProvider>
    </CustomToastProvider.Provider>
  )
}

export default ToastProvider;
