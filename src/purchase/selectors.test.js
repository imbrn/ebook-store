import { fakeEbooks } from "../ebook/fakeEbook";

import {
  hasEbooksSelected,
  isPersonalDataComplete,
  isBillingAddressComplete,
  isPaymentComplete
} from "./selectors";

test("hasProductSelect", () => {
  expect(hasEbooksSelected()).toBeFalsy();
  expect(hasEbooksSelected({})).toBeFalsy();

  expect(
    hasEbooksSelected({
      ebooks: []
    })
  ).toBeFalsy();

  expect(
    hasEbooksSelected({
      ebooks: fakeEbooks(2)
    })
  ).toBeTruthy();
});

test("isPersonalDataComplete", () => {
  expect(isPersonalDataComplete()).toBeFalsy();
  expect(isPersonalDataComplete({})).toBeFalsy();

  expect(
    isPersonalDataComplete({
      personalData: {}
    })
  ).toBeFalsy();

  expect(
    isPersonalDataComplete({
      personalData: {
        name: "Customer Name"
      }
    })
  ).toBeFalsy();

  expect(
    isPersonalDataComplete({
      personalData: {
        name: "Customer Name",
        email: "customer@email.com"
      }
    })
  ).toBeFalsy();

  expect(
    isPersonalDataComplete({
      personalData: {
        name: "Customer Name",
        email: "customer@email.com",
        cpf: "12345678910"
      }
    })
  ).toBeTruthy();

  expect(
    isPersonalDataComplete({
      personalData: {
        name: "",
        email: "customer@email.com",
        cpf: "12345678910"
      }
    })
  ).toBeFalsy();
});

test("isBillingAddressComplete", () => {
  expect(isBillingAddressComplete()).toBeFalsy();
  expect(isBillingAddressComplete({})).toBeFalsy();

  expect(
    isBillingAddressComplete({
      billingAddress: {}
    })
  ).toBeFalsy();

  expect(
    isBillingAddressComplete({
      billingAddress: {
        zipCode: "12345678"
      }
    })
  ).toBeFalsy();

  expect(
    isBillingAddressComplete({
      billingAddress: {
        zipCode: "12345678",
        state: "São Paulo"
      }
    })
  ).toBeFalsy();

  expect(
    isBillingAddressComplete({
      billingAddress: {
        zipCode: "12345678",
        state: "São Paulo",
        city: "Miguelópolis"
      }
    })
  ).toBeFalsy();

  expect(
    isBillingAddressComplete({
      billingAddress: {
        zipCode: "12345678",
        state: "São Paulo",
        city: "Miguelópolis",
        address: "Av. Leopoldo Carlos de Oliveira, 12345"
      }
    })
  ).toBeTruthy();
});

test("isPaymentComplete", () => {
  expect(isPaymentComplete()).toBeFalsy();
  expect(isPaymentComplete({})).toBeFalsy();

  expect(
    isPaymentComplete({
      payment: {}
    })
  ).toBeFalsy();

  expect(
    isPaymentComplete({
      payment: {
        method: "boleto"
      }
    })
  ).toBeTruthy();

  expect(
    isPaymentComplete({
      payment: {
        method: "creditCard"
      }
    })
  ).toBeFalsy();

  expect(
    isPaymentComplete({
      payment: {
        method: "creditCard",
        cardholderName: "Customer Name"
      }
    })
  ).toBeFalsy();

  expect(
    isPaymentComplete({
      payment: {
        method: "creditCard",
        cardholderName: "Customer Name",
        cardNumber: "4123456789012345"
      }
    })
  ).toBeFalsy();

  expect(
    isPaymentComplete({
      payment: {
        method: "creditCard",
        cardholderName: "Customer Name",
        cardNumber: "4123456789012345",
        dueDate: new Date(2026, 2)
      }
    })
  ).toBeFalsy();

  expect(
    isPaymentComplete({
      payment: {
        method: "creditCard",
        cardholderName: "Customer Name",
        cardNumber: "4123456789012345",
        dueDate: new Date(2026, 2),
        cvv: "123"
      }
    })
  ).toBeTruthy();
});
