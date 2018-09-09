import configureMockStore from "redux-mock-store";
import reduxThunk from "redux-thunk";
import { fakeEbook, fakeEbooks } from "../ebook/fakeEbook";
import { setService } from "../service";

import {
  toggleEbookSelection,
  updatePersonalData,
  updateBillingAddress,
  updatePayment,
  buy
} from "./actions";

import {
  TOGGLE_EBOOK_SELECTION,
  UPDATE_PERSONAL_DATA,
  UPDATE_BILLING_ADDRESS,
  UPDATE_PAYMENT,
  BUY
} from "./actionsTypes";

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

test("updatePersonalData", async () => {
  const store = mockStore({});
  const data = {
    name: "Customer Name",
    email: "customer@email.com",
    cpf: "123456789"
  };
  await store.dispatch(updatePersonalData(data));
  expect(store.getActions()).toEqual([{ type: UPDATE_PERSONAL_DATA, data }]);
});

test("updateBillingAddress", async () => {
  const store = mockStore({});
  const data = {
    zipCode: "12345678",
    state: "My State",
    city: "My City",
    address: "My Address, 123"
  };
  await store.dispatch(updateBillingAddress(data));
  expect(store.getActions()).toEqual([{ type: UPDATE_BILLING_ADDRESS, data }]);
});

test("updatePayment", async () => {
  const store = mockStore({});
  const data = {
    method: "creditCard",
    cardholderName: "Customer Name",
    cardNumber: "1234567891011121",
    dueDate: "12/25",
    cvv: "123"
  };
  await store.dispatch(updatePayment(data));
  expect(store.getActions()).toEqual([{ type: UPDATE_PAYMENT, data }]);
});

test("buy", async () => {
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
    }
  };

  const store = mockStore({
    purchase
  });

  setService({
    buy: () => Promise.resolve({ id: 123 })
  });

  await store.dispatch(buy());

  expect(store.getActions()).toEqual([
    { type: BUY, status: "request" },
    { type: BUY, status: "success", purchaseId: 123 }
  ]);
});
