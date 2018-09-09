import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { PaymentForm } from "./PaymentForm";

jest.mock("nanoid", () => {
  let nextId = 1;
  return () => nextId++;
});

afterEach(cleanup);

test("renders correctly", () => {
  const payment = {
    method: "creditCard",
    cardholderName: "Customer Name",
    cardNumber: "4123456789012",
    dueDate: new Date(2025, 11),
    cvv: "123"
  };
  const { container } = render(<PaymentForm payment={payment} />);
  expect(container.firstChild).toMatchSnapshot();
});

test("updatePayment", () => {
  const updatePayment = jest.fn();

  const { getByLabelText } = render(
    <PaymentForm
      payment={{ method: "creditCard" }}
      updatePayment={updatePayment}
    />
  );

  fireEvent.change(getByLabelText("Cardholder name"), {
    target: { value: "Customer Name" }
  });

  fireEvent.change(getByLabelText("Card number"), {
    target: { value: "4123456789012" }
  });

  fireEvent.change(getByLabelText("Due date"), {
    target: { value: "12/25" }
  });

  fireEvent.change(getByLabelText("CVV"), {
    target: { value: "123" }
  });

  expect(updatePayment.mock.calls).toEqual([
    [{ cardholderName: "Customer Name" }],
    [{ cardNumber: "4123456789012" }],
    [{ dueDate: "12/25" }],
    [{ cvv: "123" }]
  ]);
});

test("requestPurchase", () => {
  const requestPurchase = jest.fn();
  const { getByText } = render(
    <PaymentForm isValid={true} requestPurchase={requestPurchase} />
  );
  fireEvent.click(getByText("Buy now"));
  expect(requestPurchase.mock.calls).toHaveLength(1);
});
