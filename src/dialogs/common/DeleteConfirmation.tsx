import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ActionButton, ActionContainer } from '../../components/Button';
import { DialogContainer as FsDialogContaner } from '../../components/DialogComponets';
import Icons from '../../assets/icons/Icons';

interface Props {
  confirmationText?: string;
  title?: string;
  onDelete?: () => void;
  onCancel?: () => void;
}

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom 25px;
  > svg {
    margin-right: 10px;
  }
`;

const DialogContainer = styled(FsDialogContaner)`
  width: 450px;
`;

const DeleteConfirmation: FunctionComponent<Props> = ({ confirmationText, title, onDelete, onCancel }) => (
  <DialogContainer title={title || 'Delete Confirmation'} >
    <Content>
      <Icons.InfoIcon /><p>{confirmationText || 'Are you sure you want to delete the item/s?'}</p>
    </Content>
    <ActionContainer>
      <ActionButton layout="outline" onClick={onCancel}>
        Cancel
      </ActionButton>
      <ActionButton layout="fill" onClick={onDelete}>
        Yes
      </ActionButton>
    </ActionContainer>
  </DialogContainer>
);

export default DeleteConfirmation;
