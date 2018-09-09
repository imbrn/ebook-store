import {
  ebooks as selectedEbooks,
  personalData,
  billingAddress,
  payment,
  status
} from "./reducers";

import {
  TOGGLE_EBOOK_SELECTION,
  UPDATE_PERSONAL_DATA,
  UPDATE_BILLING_ADDRESS,
  UPDATE_PAYMENT,
  BUY
} from "./actionsTypes";

import { fakeEbooks, fakeEbook } from "../ebook/fakeEbook";

describe("ebooks", () => {
  test("default state", () => {
    expect(selectedEbooks(undefined, {})).toEqual([]);
  });

  test("handle TOGGLE_EBOOK_SELECTION", () => {
    const ebooks = fakeEbooks(3);
    const newEbook = fakeEbook(4);

    expect(
      selectedEbooks(ebooks, {
        type: TOGGLE_EBOOK_SELECTION,
        ebook: newEbook
      })
    ).toEqual([...ebooks, newEbook]);

    expect(
      selectedEbooks(ebooks, {
        type: TOGGLE_EBOOK_SELECTION,
        ebook: ebooks[1]
      })
    ).toEqual([ebooks[0], ebooks[2]]);
  });
});

describe("personalData", () => {
  test("default state", () => {
    expect(personalData(undefined, {})).toEqual({});
  });

  test("handle UPDATE_PERSONAL_DATA", () => {
    const data = {
      name: "Customer Name",
      cpf: "123456789",
      email: "customer@email.com"
    };

    expect(
      personalData(
        {},
        {
          type: UPDATE_PERSONAL_DATA,
          data
        }
      )
    ).toEqual(data);
  });
});

describe("billingAddress", () => {
  test("default state", () => {
    expect(billingAddress(undefined, {})).toEqual({});
  });

  test("handle UPDATE_BILLING_ADDRESS", () => {
    const data = {
      zipCode: "12345678",
      state: "My State",
      city: "My City",
      address: "My Address, 123"
    };

    expect(
      billingAddress(
        {},
        {
          type: UPDATE_BILLING_ADDRESS,
          data
        }
      )
    ).toEqual(data);
  });
});

describe("payment", () => {
  test("default state", () => {
    expect(payment(undefined, {})).toEqual({});
  });

  test("handle UPDATE_PAYMENT", () => {
    const data = {
      method: "creditCard",
      cardholderName: "Customer Name",
      cardNumber: "1234567891011121",
      dueDate: "12/25",
      cvv: "123"
    };

    expect(
      payment(
        {},
        {
          type: UPDATE_PAYMENT,
          data
        }
      )
    ).toEqual(data);
  });
});

describe("status", () => {
  test("default state", () => {
    expect(status(undefined, {})).toEqual({ type: "initial" });
  });

  test("handle BUY with success", () => {
    expect(
      status("initial", {
        type: BUY,
        status: "success",
        purchaseId: 123
      })
    ).toEqual({
      type: "success",
      purchaseId: 123
    });
  });
});
