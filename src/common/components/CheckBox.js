import React from "react";
import styled, { css } from "styled-components";

const CheckBox = ({ checked, ...rest }) => {
  return (
    <CheckBoxContainer>
      <CheckBoxMark checked={checked} />
      <CheckBoxInput checked={checked} {...rest} />
    </CheckBoxContainer>
  );
};

const CheckBoxContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid black;
`;

const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const CheckBoxMark = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${props =>
    props.checked &&
    css`
      background: black;
      width: 2px;
      height: 2px;
      left: 3px;
      top: 7px;
      box-shadow: 2px 0 0 black, 4px 0 0 black, 4px -2px 0 black,
        4px -4px 0 black, 4px -6px 0 black, 4px -8px 0 black;
      transform: rotate(45deg);
    `};
`;

export default CheckBox;
