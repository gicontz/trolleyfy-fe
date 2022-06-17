import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { DialogContainer } from '../../components/DialogComponets';

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  > p {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    box-sizing: border-box;
    background: lightgray;
    border-radius: 4px;
    > span {
      max-width: 150px;
    }
  }
`;

const shortcuts = [
  {
    id: 'SHOW-SHORTCUTS',
    label: 'Alt + k',
    description: 'Shows Shortcut'
  },
  {
    id: 'INDICATE-QTY',
    label: 'Alt + q',
    description: 'Indicate Quantity to the punched product'
  },
  {
    id: 'CREATE-ORDER',
    label: 'Alt + Enter',
    description: 'Input Payment to finalize Order'
  }
]

const ShowShortcut: FunctionComponent = () => (
  <DialogContainer title="Cashier Shortcuts">
    <Content>
      {shortcuts.map((s) => (
        <p key={s.id}><code>{s.label}</code><span>{s.description}</span></p>
      ))}
    </Content>
  </DialogContainer>
);

export default ShowShortcut;
