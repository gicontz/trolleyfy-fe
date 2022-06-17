import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import SearchIcon from '../../assets/icons/searchIcon.svg';

export const SearchContainer = styled.div`
  float: right;
`;

export const SearchInput = styled.input`
  width: 100px;
  height: 20px;
  font-size: 10px;
  padding-left: 33px;
  border: 1px solid #b2b2b2;
  border-radius: 26px;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: left;
  background-position-x: 10px;
  outline: none;
`;

export const FieldContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const FilterButton = styled.button`
  color: #ffffff;
  border: solid 1px #efbd34;
  background-color: #ffca3a;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-left: 8px;
  box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.2);
  background-color: #ffca3a;
`;

interface Props {
  onChange: (st: string) => void;
  placeholder?: string;
}

const SearchField: FunctionComponent<Props> = ({ onChange, placeholder }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 220) e.preventDefault(); // prevent backslash
  };

  return (
    <SearchContainer>
      <FieldContainer>
        <SearchInput
          type="text"
          value={searchText}
          placeholder={placeholder ? placeholder : 'Search'}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </FieldContainer>
    </SearchContainer>
  );
};

export default SearchField;
