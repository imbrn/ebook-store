import React from "react";
import { render, cleanup } from "react-testing-library";
import { Purchase } from "./Purchase";
import { fakeEbooks } from "../../ebook/fakeEbook";

jest.mock("nanoid", () => {
  let nextId = 1;
  return () => nextId++;
});

afterEach(cleanup);

describe("renders correctly", () => {
  test("initial", () => {
    const purchase = {
      ebooks: fakeEbooks(2),
      personalData: {
        name: "Customer Name",
        email: "customer@email.com",
        cpf: "123456789"
      },
      billingAddress: {
        zipCode: "12345678",
        state: "My State",
        city: "My City",
        address: "My Address, 123"
      },
      payment: {
        method: "creditCard",
        cardholderName: "Customer Name",
        cardNumber: "1234567891011121",
        dueDate: "12/25",
        cvv: "123"
      },
      status: {
        type: "initial"
      }
    };

    const { container } = render(<Purchase purchase={purchase} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("purchased with success", () => {
    const purchase = {
      ebooks: fakeEbooks(2),
      personalData: {
        name: "Customer Name",
        email: "customer@email.com",
        cpf: "123456789"
      },
      billingAddress: {
        zipCode: "12345678",
        state: "My State",
        city: "My City",
        address: "My Address, 123"
      },
      payment: {
        method: "creditCard",
        cardholderName: "Customer Name",
        cardNumber: "1234567891011121",
        dueDate: "12/25",
        cvv: "123"
      },
      status: {
        type: "success",
        purchaseId: 123
      }
    };

    const { container } = render(<Purchase purchase={purchase} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
