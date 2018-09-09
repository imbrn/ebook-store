import { name, email, cpf } from "./personalData";

test("name", () => {
  expect(name.test("Customer Name")).toBeTruthy();
  expect(name.test("")).toBeFalsy();
  expect(name.test("A")).toBeFalsy();
  expect(name.test(null)).toBeFalsy();
  expect(name.test()).toBeFalsy();
});

test("email", () => {
  expect(email.test("name")).toBeFalsy();
  expect(email.test("name@")).toBeFalsy();
  expect(email.test("name@something")).toBeFalsy();
  expect(email.test("@something.com")).toBeFalsy();
  expect(email.test("name.something.com")).toBeFalsy();
  expect(email.test("name@something.com")).toBeTruthy();
});

test("cpf", () => {
  expect(cpf.test("12345678910")).toBeTruthy();
  expect(cpf.test("2345678910")).toBeFalsy();
  expect(cpf.test("012345678910")).toBeFalsy();
  expect(cpf.test(undefined)).toBeFalsy();
  expect(cpf.test(null)).toBeFalsy();
  expect(cpf.test(null)).toBeFalsy();
  expect(cpf.test("abcdefghijk")).toBeFalsy();
});
