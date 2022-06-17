import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<{ name: string; value: string }>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  multiLine?: boolean;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const inputStyles = css`
  width: 100%;
  outline: none;
  font-size: 13px;
  padding: 5px 10px;
  box-sizing: border-box;
  height: 35px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.form.field.normal.BORDER_COLOR};
`;

export const Label = styled.label<{ important?: boolean }>`
  font-size: 13px;
  text-align: left;
  margin-bottom: 6px;
  display: inline-block;
  position: relative;
  color: ${({ theme }) => theme.form.label.normal.TEXT_COLOR};
  ${({ important }) =>
    important &&
    `
  &::after {
    content: '*';
    position: absolute;
    top: 0;
    right: -10px;
    color: red;
  }
  `}
`;

const Field = styled.input<{ hasError?: boolean }>`
  ${inputStyles}
  ${({ hasError, theme }) =>
    hasError &&
    `
    border: 1px solid ${theme.form.field.error?.BORDER_COLOR};
  `}
`;

const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 54px;
  max-height: 85px;
  resize: none;
`;

const TextField: FunctionComponent<Props> = (props: Props) => {
  const { name, value, multiLine, placeholder, type, hasError, disabled, maxLength, autoFocus, onChange, onKeyPress, onBlur, ...others } = props;
  return (
    <>
      {multiLine && <TextArea name={name} value={value} placeholder={placeholder} disabled={disabled} onChange={onChange} {...others} />}
      {!multiLine && (
        <Field
          hasError={hasError}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          maxLength={maxLength}
          autoFocus={autoFocus}
          {...others}
        />
      )}
    </>
  );
};

export default TextField;
