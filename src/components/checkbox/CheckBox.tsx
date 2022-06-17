import React from 'react';
import styled from 'styled-components';
import { Checkbox as MuiCheckBox } from '@material-ui/core';
import { ReactComponent as CheckIcon } from '../../assets/icons/checkIcon.svg';

export const CheckBox = styled(MuiCheckBox).attrs({
  checkedIcon: <CheckIcon />
})`
  padding: 0;
  > span {
    width: 16px;
    height: 16px;
    > svg {
      display: none;
    }
  }
  > span:first-of-type {
    border: 1px solid rgba(200,178,178,0.5);
    border-radius: 4px;
  }
  > .MuiTouchRipple-root {
    z-index: -1;
    top: 10px;
    left: 10px;
  }
  &.Mui-checked {
    > span {
      align-items: center;
      border-radius: 4px;
      > svg {
        display: block;
      }
    }
    > span:first-of-type {
      border-color: transparent;
    }
  }
`;
