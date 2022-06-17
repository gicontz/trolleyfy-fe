import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import OrderHistoryTable from '../layouts/table/OrderHistoryTable';

const Container = styled.div``;

const OrderHistoryView: FunctionComponent = () => {

  return (
    <Container>
      <h2>Order History</h2>
      <OrderHistoryTable />
    </Container>
  )
};

export default OrderHistoryView;
