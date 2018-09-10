import React from "react";
import styled, { css } from "styled-components";
import styles from "./StepPanel.css";
import classnames from "classnames";

import {
  Text,
  Label,
  TextField,
  Button,
  Select
} from "../../common/components";

const StepPanel = ({
  open,
  children,
  number,
  title,
  className,
  childrenClassName,
  ...rest
}) => (
  <div className={classnames(styles.stepPanel, className)} {...rest}>
    <header>
      <Number open={open}>{number}</Number>
      <Text bold>{title}</Text>
    </header>
    {open ? (
      <div className={classnames(styles.stepPanelChildren, childrenClassName)}>
        {children}
      </div>
    ) : null}
  </div>
);

StepPanel.defaultProps = {
  open: false
};

const Number = styled.span`
  display: inline-block;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 32px;
  border-radius: 100%;
  font-weight: bold;
  border: 2px solid black;
  margin-right: 10px;

  ${props =>
    props.open &&
    css`
      background: #d8d8d8;
      border-color: transparent;
    `};
`;

export { Label, TextField, Button, Select };

export const StepPanelField = ({
  label,
  component: C = TextField,
  error,
  fieldId,
  className,
  ...rest
}) => (
  <div className={classnames(styles.stepPanelField, className)}>
    <div className={styles.stepPanelFieldLabelContainer}>
      <Label htmlFor={fieldId} color={error ? "error" : null} size="small">
        {label}
      </Label>
      {error ? <Text type="error">${error}</Text> : null}
    </div>
    <div>
      <C
        id={fieldId}
        color={error ? "error" : null}
        className={styles.stepPanelFieldComponent}
        {...rest}
      />
    </div>
  </div>
);

export default StepPanel;
