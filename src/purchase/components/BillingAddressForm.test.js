import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { BillingAddressForm } from "./BillingAddressForm";
import { setService } from "../../service";

jest.mock("nanoid", () => {
  let nextId = 1;
  return () => nextId++;
});

jest.mock("react-select", () => {
  return ({ ...rest }) => <input type="text" {...rest} />;
});

afterEach(cleanup);

beforeEach(() => {
  setService({});
});

test("renders correctly", () => {
  const billingAddress = {
    zipCode: "14530000",
    state: "São Paulo",
    city: "Miguelópolis",
    address: "Av. Leopoldo Carlos de Oliveira, 1234"
  };
  const { container } = render(
    <BillingAddressForm billingAddress={billingAddress} />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test("updateBillingAddress", () => {
  const updateBillingAddress = jest.fn();
  const { getByPlaceholderText } = render(
    <BillingAddressForm updateBillingAddress={updateBillingAddress} />
  );

  fireEvent.change(getByPlaceholderText("Your zip code here"), {
    target: { value: "14530000" }
  });

  fireEvent.change(getByPlaceholderText("Your state here"), {
    target: { value: "SP" }
  });

  fireEvent.change(getByPlaceholderText("Your city here"), {
    target: { value: "Miguelópolis" }
  });

  fireEvent.change(getByPlaceholderText("Your full address here"), {
    target: { value: "My Street, 123" }
  });

  expect(updateBillingAddress.mock.calls).toEqual([
    [{ zipCode: "14530000" }],
    [{ state: "SP" }],
    [{ city: "Miguelópolis" }],
    [{ address: "My Street, 123" }]
  ]);
});
