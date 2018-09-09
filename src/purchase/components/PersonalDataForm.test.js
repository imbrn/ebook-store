import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { PersonalDataForm } from "./PersonalDataForm";

jest.mock("nanoid", () => {
  let nextId = 0;
  return () => nextId++;
});

afterEach(cleanup);

test("renders correctly", () => {
  const personalData = {
    name: "Customer Name",
    email: "customer@email.com",
    cpf: "12345678910"
  };
  const { container } = render(
    <PersonalDataForm personalData={personalData} />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test("updatePersonalData", () => {
  const updatePersonalData = jest.fn();
  const { getByPlaceholderText } = render(
    <PersonalDataForm updatePersonalData={updatePersonalData} />
  );

  fireEvent.change(getByPlaceholderText("Your name here"), {
    target: { value: "My Name" }
  });

  fireEvent.change(getByPlaceholderText("Your e-mail here"), {
    target: { value: "my@email.com" }
  });

  fireEvent.change(getByPlaceholderText("Your CPF here"), {
    target: { value: "12345678910" }
  });

  expect(updatePersonalData.mock.calls).toEqual([
    [{ name: "My Name" }],
    [{ email: "my@email.com" }],
    [{ cpf: "12345678910" }]
  ]);
});
