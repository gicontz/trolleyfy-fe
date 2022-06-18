import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import styled from 'styled-components';
import { clearPunchedItems, createOrder, punchItem, setBarcode } from '../api/cashier';
import { TCreateOrderData } from '../api/cashier/types';
import { popToast } from '../api/toast';
import { ActionButton, ActionContainer } from '../components/Button';
import LoadingOverlay from '../components/progress/LoadingOverlay';
import OrderSuccess from '../dialogs/cashier/OrderSuccess';
import { ShowShortcut } from '../dialogs/common';
import PurchaseTable from '../layouts/table/PurchaseTable';
import { useCashrContext } from '../providers/cashier';
import { useDialog } from '../providers/dialog';

const Container = styled.div`
  display: flex;
  position: relative;
`;

const RightSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  > .totalPricing {
    width: 100%;
    > h2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      padding-bottom: 30px;
      border-bottom: 1px solid;
    }
  }
  > .purchaseTable {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 77vh;
  }
`;

const StyledActionContainer = styled(ActionContainer)`
  align-items: flex-end;
  width: 45%;
  margin-top: 20px;
`;

const CashierView: FunctionComponent = () => {
    const [openDialog, closeDialog] = useDialog();
    const [totalPrice, setTotalPrice] = useState(0);
    const { cashrStore: store, cashrDispatch: dispatch } = useCashrContext();
    const sOpenedRef = useRef(false);
    const pItemsRef = useRef(store.purchasedItems);
    pItemsRef.current = store.purchasedItems;
    sOpenedRef.current = false;

    const showShortcuts = () => {
      if (!sOpenedRef.current) {
        openDialog({
          children: <ShowShortcut />
        });
      } else {
        closeDialog();
      }
      sOpenedRef.current = !sOpenedRef.current;
    };

    useHotkeys('alt+k', showShortcuts);

    useEffect(() => {
      if (store.barcode.code !== '') {
        punchItem({productCode: store.barcode.code}, { cashier: dispatch, toast: store.toastDispatcher });
      }
    }, [store.barcode]);

    useEffect(() => {
      if (store.punchedItems.length > 0) {
        const totalPrice = store.punchedItems.map(({price}) => parseInt(price, 10)).reduce((a,b) => a + b);
        setTotalPrice(totalPrice);
      } else {
        setTotalPrice(0);
      }
    }, [store.punchedItems]);

    useEffect(() => {
      return () => {
        setBarcode('', dispatch);
      }
    }, []);

    useEffect(() => {
      const { pop } = store.toastInfo;
      if(pop) popToast(store.toastInfo, store.toastDispatcher);
    }, [store.toastInfo]);

    const handlePayment = (o: TCreateOrderData) => (p: number) => {
    }

    const handleCreateOrder = async () => {
      const order = {
        items: pItemsRef.current.map(({ pqty, itemId }) => ({ itemId, qty: pqty })),
        paidAmt: 0,
      }
      if (pItemsRef.current.length > 0) {
        await createOrder({...order, paidAmt: totalPrice }, { cashier: dispatch, toast: store.toastDispatcher });
        closeDialog();
        openDialog({
          children: <OrderSuccess onClose={closeDialog} />
        })
      }
    };

    const handleReset = () => {
      clearPunchedItems({cashier: dispatch, toast: store.toastDispatcher});
    }

    return (
      <Container>
        <LoadingOverlay display={store.isPurchasing} />
        <RightSection>
          <div className="totalPricing">
            <h2><span>Total:</span> <span>{totalPrice} Php</span></h2>
          </div>
          <div className="purchaseTable">
            <PurchaseTable />
            <StyledActionContainer>
              <ActionButton onClick={handleReset}>Reset</ActionButton>
              <ActionButton layout="fill" onClick={handleCreateOrder}>Complete Order</ActionButton>
            </StyledActionContainer>
          </div>
        </RightSection>
      </Container>
    )
};

export default CashierView;
