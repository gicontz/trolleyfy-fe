import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ActionButton } from '../../components/Button';
import { DialogContainer } from '../../components/DialogComponets';
import PaymentSuccessGif from '../../assets/paymentCheck-pink.gif';
import { useCashrContext } from '../../providers/cashier';
import { clearPunchedItems } from '../../api/cashier';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  > img {
    width: 158px;
    margin: 0 auto;
  }
  > p {
    margin: 0;
    margin-bottom: 5px;
  }
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 70px;
  text-align: left;
  > p {
    margin: 0;
    margin-bottom: 5px;
  }
`;

const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
`;


const OrderSuccess: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  const { cashrStore: store, cashrDispatch: cashier } = useCashrContext();
  const { orderId, totalAmt, totalQty, paidAmt, change } = store.successOrder;

  const handleOk = () => {
    onClose();
    clearPunchedItems({cashier, toast: store.toastDispatcher});
  }

  return (
    <DialogContainer title="Order Details">
      <Container>
        <h1>Thanks be to God!</h1>
        <img src={PaymentSuccessGif} />
        <OrderDetails>
          <p>Order from: <strong>MCGI Free Store Cavite - Bulihan Branch</strong></p>
          <p>Order number: <strong>#{orderId}</strong></p>
          <p>Order qty: <strong>{totalQty}</strong></p>
          <p>Order amount: <strong>{totalAmt} Php</strong></p>
          <p>Amount paid: <strong>{paidAmt} Php</strong></p>
          <p>Change: <strong>{change} Php</strong></p>
        </OrderDetails>
        <p><strong>Salamat sa Dios</strong> | Thanks be to God | <strong>神に感謝します</strong></p>
        <p>感谢上帝 | <strong>하나님 께 감사합니다</strong> | terima kasih Tuhan</p>
      </Container>
      <ActionContainer>
        <ActionButton layout="fill" onClick={handleOk}>OK</ActionButton>
      </ActionContainer>
    </DialogContainer>
  )
};

export default OrderSuccess;
