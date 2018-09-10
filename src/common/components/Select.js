import React from "react";
import styled from "styled-components";
import ArrowSvg from "./arrow.svg";

const Select = ({ options, value, className, ...rest }) => {
  return (
    <SelectContainer>
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
      <SelectArrow>
        <ArrowSvg />
      </SelectArrow>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  width: 200px;
  height: 48px;
  display: block;
  position: relative;
  background: white;
  border: 1px solid #c5c5c5;
`;

const SelectElement = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  appearance: none;
  background: none;
  border: none;
`;

const SelectOption = styled.option``;

const SelectArrow = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  pointer-events: none;

  svg {
    width: auto;
    height: 12px;
  }
`;

export default Select;
