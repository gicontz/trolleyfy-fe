import CommonButton from '@material-ui/core/Button';
import styled from 'styled-components';

export const IconBtn = styled(CommonButton)<{ shade?: 'light' | 'dark' }>`
  &.MuiButton-root {
    min-width: unset;
    width: 41px;
    height: 41px;
    min-width: 0;
    padding: 0;
    margin-right: 10px;
    border-radius: 50%;
    background-color: ${({ shade, theme }) =>
      shade === 'light' ? theme.button.contained.light.normal.BG_COLOR : theme.button.contained.dark.normal.BG_COLOR};
    display: flex;
    align-items: center;
    > img {
      margin: 0 auto;
    }
  }
`;

const Button = styled(CommonButton)<{ shade?: 'light' | 'dark' }>`
  &.MuiButton-root {
    background-color: ${({ shade, theme }) =>
      shade === 'light' ? theme.button.contained.light.normal.BG_COLOR : theme.button.contained.dark.normal.BG_COLOR};
    color: ${({ shade, theme }) =>
      shade === 'light' ? theme.button.contained.light.normal.TEXT_COLOR : theme.button.contained.dark.normal.TEXT_COLOR};
    font-size: 13px;
    text-transform: unset;
    padding: 9.9px 38px 9.1px 39px;
    width: 68px;
    border: solid 2px
      ${({ shade, theme }) =>
        shade === 'light'
          ? theme.button.contained.light.normal.BORDER_COLOR
          : theme.button.contained.dark.normal.BORDER_COLOR};
    border-radius: 26px;
    height: 30px;
    &:disabled {
      color: ${({ theme }) => theme.button.contained.dark.disabled?.TEXT_COLOR};
    }
  }
`;

type ButtonLayout = 'fill' | 'outline';

export const ActionButton = styled(Button)<{ layout?: ButtonLayout }>`
&.MuiButton-root {
  background-color: ${({ layout, theme }) =>
    layout === 'outline' || layout === undefined
      ? theme.button.action.light.normal.BG_COLOR
      : theme.button.action.dark.normal.BG_COLOR};
  color: ${({ layout, theme }) =>
    layout === 'outline' || layout === undefined
      ? theme.button.action.light.normal.TEXT_COLOR
      : theme.button.action.dark.normal.TEXT_COLOR};
  padding: 11.5px 36.5px;
  border: solid 2px
    ${({ layout, theme }) =>
      layout === 'outline' || layout === undefined
        ? theme.button.action.light.normal.BORDER_COLOR
        : theme.button.action.dark.normal.BORDER_COLOR};
  border-radius: 26px;
  width: auto;
  height: 41px;
  &:hover {
    background-color: ${({ theme }) => theme.button.action.light.hover?.BG_COLOR};
    color: ${({ theme }) => theme.button.action.light.hover?.TEXT_COLOR};
  }
}
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-left: auto;
  > button {
    margin-left: 10px;
  }
`;
