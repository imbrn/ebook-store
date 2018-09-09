import React from "react";
import styled from "styled-components";

import {
  Text,
  Label,
  TextField,
  Button,
  Select
} from "../../common/components";

const StepPanel = ({ open, children, number, title, ...rest }) => (
  <div {...rest}>
    <header>
      <Number>{number}</Number>
      <Text bold>{title}</Text>
    </header>
    {open ? <div>{children}</div> : null}
  </div>
);

const Number = styled.span``;

export { Label, TextField, Button, Select };

export const StepPanelField = ({
  label,
  component: C,
  error,
  fieldId,
  ...rest
}) => (
  <div>
    <div>
      <Label htmlFor={fieldId} color={error ? "error" : null}>
        {label}
      </Label>
      {error ? <Text type="error">${error}</Text> : null}
    </div>
    <div>
      <C id={fieldId} color={error ? "error" : null} {...rest} />
    </div>
  </div>
);

export default StepPanel;
