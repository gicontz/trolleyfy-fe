import { Routes, Route } from 'react-router-dom';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { APP_PATHS } from '../constants/paths';
import LeftNavbar from '../layouts/LeftNavbar';
import CashierView from './CashierView';
import InventoryView from './InventoryView';
import OrderHistoryView from './OrderHistoryView';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

const AppContent = styled.div`
  margin-left: 14px;
  width: 100%;
  padding: 5px 50px 20px 0;
  box-sizing: bordered-box;
`;

const MainView: FunctionComponent = () => {

  return (
    <AppContainer>
      <LeftNavbar />
      <AppContent>
        <Routes>
          <Route path={APP_PATHS.INVENTORY} element={<InventoryView />}/>
          <Route path={APP_PATHS.CASHIER} element={<CashierView />}/>
          <Route path={APP_PATHS.ORDER_HISTORY} element={<OrderHistoryView />}/>
        </Routes>
      </AppContent>
    </AppContainer>
  )
};

export default MainView;
