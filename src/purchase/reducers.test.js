import { ebooks, status } from "./reducers";
import { TOGGLE_EBOOK_SELECTION, REQUEST_BUY } from "./actionsTypes";
import { fakeEbooks, fakeEbook } from "../ebook/fakeEbook";

describe("ebooks", () => {
  test("default state", () => {
    expect(ebooks(undefined, {})).toEqual([]);
  });

  test("handle TOGGLE_EBOOK_SELECTION", () => {
    const selectedEbooks = fakeEbooks(3);
    const newEbook = fakeEbook(4);

    expect(
      ebooks(selectedEbooks, {
        type: TOGGLE_EBOOK_SELECTION,
        ebook: newEbook
      })
    ).toEqual([...selectedEbooks, newEbook]);

    expect(
      ebooks(selectedEbooks, {
        type: TOGGLE_EBOOK_SELECTION,
        ebook: selectedEbooks[1]
      })
    ).toEqual([selectedEbooks[0], selectedEbooks[2]]);
  });
});

describe("status", () => {
  let data;

  beforeEach(() => {
    data = {
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
      }
    };
  });

  test("default state", () => {
    expect(status(undefined, {})).toEqual({ kind: "initial" });
  });

  test("handle BUY request", () => {
    expect(
      status(
        { kind: "initial" },
        { type: REQUEST_BUY, status: "request", data }
      )
    ).toEqual({
      kind: "request",
      data
    });
  });

  test("handle BUY success", () => {
    expect(
      status(
        { kind: "request" },
        { type: REQUEST_BUY, status: "success", purchaseId: 123, data }
      )
    ).toEqual({
      kind: "success",
      purchaseId: 123,
      data
    });
  });

  test("handle BUY fail", () => {
    expect(
      status(
        { kind: "request" },
        { type: REQUEST_BUY, status: "fail", cause: "Some error", data }
      )
    ).toEqual({
      kind: "fail",
      cause: "Some error",
      data
    });
  });
});
