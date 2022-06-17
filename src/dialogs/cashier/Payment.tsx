import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { DialogContainer } from '../../components/DialogComponets';
import TextField from '../../components/fields/TextField';

interface Props {
  onPayment?: (payment: number) => void;
  onClose?: () => void;
}

const Payment: FunctionComponent<Props> = ({ onPayment, onClose }) => {
  const [value, setValue] = useState(0);

  const handlePayment = (e: React.ChangeEvent<{name: string, value: string}>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    setValue(value);
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (typeof onPayment === 'function') onPayment(value);
      if (typeof onClose === 'function') onClose();
    }
  }

  return (
    <DialogContainer title={'Payment Amount'}>
      <TextField value={value.toString()} onChange={handlePayment} onKeyPress={handleEnter} autoFocus/>
    </DialogContainer>
  )
};

export default Payment;
