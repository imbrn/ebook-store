import configureMockStore from "redux-mock-store";
import reduxThunk from "redux-thunk";
import { fakeEbook, fakeEbooks } from "../ebook/fakeEbook";
import { setService } from "../service";
import { toggleEbookSelection, buy, requestBuy } from "./actions";
import { TOGGLE_EBOOK_SELECTION, REQUEST_BUY } from "./actionsTypes";

let mockStore;

beforeAll(() => {
  mockStore = configureMockStore([reduxThunk]);
});

test("toggleEbookSelection", async () => {
  const store = mockStore({});
  const ebook = fakeEbook(3);
  await store.dispatch(toggleEbookSelection(ebook));
  expect(store.getActions()).toEqual([{ type: TOGGLE_EBOOK_SELECTION, ebook }]);
});

describe("requestBuy", () => {
  test("success", async () => {
    const ebooks = fakeEbooks(3);
    const data = {
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

    const store = mockStore({
      purchase: {
        ebooks
      }
    });

    setService({
      requestBuy: () => Promise.resolve({ id: 123 })
    });

    await store.dispatch(requestBuy(data));

    expect(store.getActions()).toEqual([
      { type: REQUEST_BUY, status: "request", data, ebooks },
      { type: REQUEST_BUY, status: "success", purchaseId: 123, data, ebooks }
    ]);
  });

  test("fail", async () => {
    const ebooks = fakeEbooks(3);
    const data = {
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

    const store = mockStore({
      purchase: {
        ebooks
      }
    });

    setService({
      requestBuy: () => Promise.reject("Some error")
    });

    await store.dispatch(requestBuy(data));

    expect(store.getActions()).toEqual([
      { type: REQUEST_BUY, status: "request", data, ebooks },
      { type: REQUEST_BUY, status: "fail", cause: "Some error", data, ebooks }
    ]);
  });
});
