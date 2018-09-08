import { cardholderName, cardNumber, dueDate, cvv } from "./creditCard";

test("cardholderName", () => {
  expect(cardholderName.test("Customer Name")).toBeTruthy();
  expect(cardholderName.test("")).toBeFalsy();
  expect(cardholderName.test("A")).toBeFalsy();
  expect(cardholderName.test(null)).toBeFalsy();
  expect(cardholderName.test()).toBeFalsy();
});

test("cardNumber", () => {
  expect(cardNumber.test("4123456789012")).toBeTruthy();
  expect(cardNumber.test("4123456789012345")).toBeTruthy();
  expect(cardNumber.test("5134567890123456")).toBeTruthy();
  expect(cardNumber.test("5534567890123456")).toBeTruthy();
  expect(cardNumber.test("2221567890123456")).toBeTruthy();
  expect(cardNumber.test("2720567890123456")).toBeTruthy();
  expect(cardNumber.test("512345678901")).toBeFalsy();
  expect(cardNumber.test("6123456789012345")).toBeFalsy();
  expect(cardNumber.test("7134567890123456")).toBeFalsy();
  expect(cardNumber.test("3234567890123456")).toBeFalsy();
  expect(cardNumber.test("2121567890123456")).toBeFalsy();
  expect(cardNumber.test("2920567890123456")).toBeFalsy();
});

test("dueDate", () => {
  expect(dueDate.test("12/25")).toBeTruthy();
  expect(dueDate.test("12/75")).toBeTruthy();
  expect(dueDate.test("01/25")).toBeTruthy();
  expect(dueDate.test("12/2025")).toBeTruthy();
  expect(dueDate.test("00/25")).toBeFalsy();
  expect(dueDate.test("1/25")).toBeFalsy();
  expect(dueDate.test("32/25")).toBeFalsy();
  expect(dueDate.test("2025/12")).toBeFalsy();
  expect(dueDate.test("")).toBeFalsy();
  expect(dueDate.test(null)).toBeFalsy();
  expect(dueDate.test()).toBeFalsy();
});

test("cvv", () => {
  expect(cvv.test("123")).toBeTruthy();
  expect(cvv.test("1234")).toBeTruthy();
  expect(cvv.test("")).toBeFalsy();
  expect(cvv.test("1")).toBeFalsy();
  expect(cvv.test("12")).toBeFalsy();
  expect(cvv.test("12345")).toBeFalsy();
});
