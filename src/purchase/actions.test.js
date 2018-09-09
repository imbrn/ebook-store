import configureMockStore from "redux-mock-store";
import reduxThunk from "redux-thunk";
import { fakeEbook, fakeEbooks } from "../ebook/fakeEbook";
import { setService } from "../service";
import { toggleEbookSelection, buy } from "./actions";
import { TOGGLE_EBOOK_SELECTION, BUY } from "./actionsTypes";

let mockStore;

beforeAll(() => {
  mockStore = configureMockStore([reduxThunk]);
});

test("toggleEbookSelection", async () => {
  const store = mockStore({ ebooks: [] });
  const ebook = fakeEbook(3);
  await store.dispatch(toggleEbookSelection(ebook));
  expect(store.getActions()).toEqual([{ type: TOGGLE_EBOOK_SELECTION, ebook }]);
});

describe("buy", () => {
  test("success", async () => {
    const data = {
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

    const store = mockStore({});

    setService({
      buy: () => Promise.resolve({ id: 123 })
    });

    await store.dispatch(buy(data));

    expect(store.getActions()).toEqual([
      { type: BUY, status: "request", data },
      { type: BUY, status: "success", purchaseId: 123, data }
    ]);
  });

  test("fail", async () => {
    const data = {
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

    const store = mockStore({});

    setService({
      buy: () => Promise.reject("Some error")
    });

    await store.dispatch(buy(data));

    expect(store.getActions()).toEqual([
      { type: BUY, status: "request", data },
      { type: BUY, status: "fail", cause: "Some error", data }
    ]);
  });
});
