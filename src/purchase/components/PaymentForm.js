import React, { PureComponent } from "react";
import styled from "styled-components";
import StepPanel, { StepPanelField, TextField, Button } from "./StepPanel";
import { Formik } from "formik";
import nanoid from "nanoid";

export const PaymentForm = ({
  open,
  number,
  title,
  payment,
  isValid,
  updatePayment,
  requestPurchase
}) => {
  const changePaymentMethod = method => {
    updatePayment({
      method
    });
  };

  return (
    <StepPanel open={open} number={number} title={title}>
      <div>
        <PaymentMethodButton
          selected={payment.method === "boleto"}
          onClick={() => changePaymentMethod("boleto")}
        >
          Boleto Bancário
        </PaymentMethodButton>

        <PaymentMethodButton
          selected={payment.method === "creditCard"}
          onClick={() => changePaymentMethod("creditCard")}
        >
          Credit Card
        </PaymentMethodButton>
      </div>

      {payment.method === "creditCard" ? (
        <CreditCardForm
          payment={payment}
          isValid={isValid}
          updatePayment={updatePayment}
          requestPurchase={requestPurchase}
        />
      ) : (
        <BoletoForm isValid={isValid} requestPurchase={requestPurchase} />
      )}
    </StepPanel>
  );
};

PaymentForm.defaultProps = {
  open: true,
  number: 3,
  title: "Payment",
  payment: { method: "boleto" },
  isValid: false,
  updatePayment: () => {},
  requestPurchase: () => {}
};

const CreditCardForm = ({
  payment,
  isValid,
  updatePayment,
  requestPurchase
}) => {
  const cardholderNameFieldId = nanoid(8);
  const cardNumberFieldId = nanoid(8);
  const dueDateFieldId = nanoid(8);
  const cvvFieldId = nanoid(8);

  const onSubmit = e => {
    e.preventDefault();
    if (isValid) {
      requestPurchase();
    }
  };

  const handleInputChange = (e, handleChange) => {
    updatePayment({
      [e.target.name]: e.target.value
    });
    handleChange(e);
  };

  return (
    <Formik
      initialValues={{
        cardholderName: payment.cardholderName || "",
        cardNumber: payment.cardNumber || "",
        dueDate: payment.dueDate || "",
        cvv: payment.cvv || ""
      }}
      onSubmit={onSubmit}
      render={({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          <StepPanelField
            component={TextField}
            fieldId={cardholderNameFieldId}
            name="cardholderName"
            label="Cardholder name"
            placeholder="Your name here"
            value={values.cardholderName}
            error={touched.cardholderName && errors.cardholderName}
            onChange={e => handleInputChange(e, handleChange)}
            onBlur={handleBlur}
          />

          <StepPanelField
            component={TextField}
            fieldId={cardNumberFieldId}
            name="cardNumber"
            label="Card number"
            placeholder="1234567891011121"
            value={values.cardNumber}
            error={touched.cardNumber && errors.cardNumber}
            onChange={e => handleInputChange(e, handleChange)}
            onBlur={handleBlur}
          />

          <StepPanelField
            component={TextField}
            fieldId={dueDateFieldId}
            name="dueDate"
            label="Due date"
            placeholder="12/25"
            value={values.dueDate}
            error={touched.dueDate && errors.dueDate}
            onChange={e => handleInputChange(e, handleChange)}
            onBlur={handleBlur}
          />

          <StepPanelField
            component={TextField}
            fieldId={cvvFieldId}
            name="cvv"
            label="CVV"
            placeholder="123"
            value={values.cvv}
            error={touched.cvv && errors.cvv}
            onChange={e => handleInputChange(e, handleChange)}
            onBlur={handleBlur}
          />

          <Button highlighted disabled={!isValid}>
            Buy now
          </Button>
        </form>
      )}
    />
  );
};

const BoletoForm = ({ isValid, requestPurchase }) => {
  const onSubmit = e => {
    e.preventDefault();
    requestPurchase();
  };

  return (
    <form onSubmit={onSubmit}>
      <Button highlighted disabled={!isValid}>
        Buy now
      </Button>
    </form>
  );
};

const PaymentMethodButton = styled(Button)``;
