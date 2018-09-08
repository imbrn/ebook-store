import { zipCode, state, city, address } from "./billingAddress";

test("zipCode", () => {
  expect(zipCode.test("12345678")).toBeTruthy();
  expect(zipCode.test("012345678")).toBeFalsy();
  expect(zipCode.test("2345678")).toBeFalsy();
  expect(zipCode.test("abcdefgh")).toBeFalsy();
  expect(zipCode.test(null)).toBeFalsy();
  expect(zipCode.test()).toBeFalsy();
});

test("state", () => {
  expect(state.test("São Paulo")).toBeTruthy();
  expect(state.test("SP")).toBeTruthy();
  expect(state.test("")).toBeFalsy();
  expect(state.test("A")).toBeFalsy();
  expect(state.test(null)).toBeFalsy();
  expect(state.test()).toBeFalsy();
});

test("city", () => {
  expect(city.test("São Paulo")).toBeTruthy();
  expect(city.test("")).toBeFalsy();
  expect(city.test("A")).toBeFalsy();
  expect(city.test(null)).toBeFalsy();
  expect(city.test()).toBeFalsy();
});

test("address", () => {
  expect(address.test("My Address, 123")).toBeTruthy();
  expect(address.test("")).toBeFalsy();
  expect(address.test(null)).toBeFalsy();
  expect(address.test()).toBeFalsy();
});
