import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import TextField, { Label } from './TextField';

interface Props {
  labelName: string;
  name: string;
  value?: string;
  placeholder: string;
  type?: string;
  important?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (n: string, s: string) => void;
}

const Container = styled.div<{ hasError?: boolean }>`
  margin-bottom: 20px;
  ${({ hasError }) =>
    hasError &&
    `
    margin-bottom: 0px;
  `}
`;

const HelperText = styled.p`
  margin: 0 0 4px 1px;
  font-size: 11px;
  color: ${({ theme }) => theme.form.label.error?.TEXT_COLOR};
`;

const HelperField: FunctionComponent<Props> = (props: Props) => {
  const { labelName, name, value, maxLength, placeholder, type, important, disabled, onChange } = props;

  const [hasError, setHasError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<{ name: string; value: string }>) => {
    if (typeof onChange === 'function') onChange(name, event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (value === '' && important) {
      setHelperText(`${labelName} is required.`);
      setHasError(true);
      return;
    }
    setHasError(false);
  };

  return (
    <Container hasError={hasError}>
      <Label important={important}>{labelName}</Label>
      <TextField
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        hasError={hasError}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        maxLength={maxLength}
      />
      {hasError && <HelperText>{helperText}</HelperText>}
    </Container>
  );
};

export default HelperField;
