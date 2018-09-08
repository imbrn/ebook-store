import configureMockStore from "redux-mock-store";
import reduxThunk from "redux-thunk";
import { fakeEbook } from "../ebook/fakeEbook";

import {
  toggleEbookSelection,
  updatePersonalData,
  updateBillingAddress,
  updatePayment
} from "./actions";

import {
  TOGGLE_EBOOK_SELECTION,
  UPDATE_PERSONAL_DATA,
  UPDATE_BILLING_ADDRESS,
  UPDATE_PAYMENT
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
