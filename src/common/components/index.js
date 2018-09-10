import styled, { css } from "styled-components";
import Select from "react-select";
import CheckBox from "./CheckBox";

export const Text = styled.span`
  ${props =>
    props.bold &&
    css`
      font-weight: bold;
    `};

  font-size: ${props => (props.size === "medium" ? "18px" : "14px")};
`;

export const Separator = styled.hr`
  border: none;
  height: 2px;
  background: #dedede;
`;

export const Image = styled.img``;
export const Label = styled.label``;
export const TextField = styled.input.attrs({ type: "text" })``;
export const Button = styled.button``;
export { Select, CheckBox };
