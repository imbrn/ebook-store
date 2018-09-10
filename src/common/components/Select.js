import React from "react";
import styled from "styled-components";

const Select = ({ options, value, className, ...rest }) => {
  return (
    <SelectElement
      value={value ? value.value : ""}
      className={className}
      {...rest}
    >
      {options.map(option => (
        <SelectOption key={option.value} value={option.value}>
          {option.label}
        </SelectOption>
      ))}
    </SelectElement>
  );
};

const SelectElement = styled.select`
  height: 48px;
  padding: 0 20px;
  background: white;
  border: 1px solid #c5c5c5;
  appearance: none;
`;

const SelectOption = styled.option``;

export default Select;
