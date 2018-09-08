import {
  TOGGLE_EBOOK_SELECTION,
  UPDATE_PERSONAL_DATA,
  UPDATE_BILLING_ADDRESS,
  UPDATE_PAYMENT
} from "./actionsTypes";

export function toggleEbookSelection(ebook) {
  return {
    type: TOGGLE_EBOOK_SELECTION,
    ebook
  };
}

export function updatePersonalData(data) {
  return {
    type: UPDATE_PERSONAL_DATA,
    data
  };
}

export function updateBillingAddress(data) {
  return {
    type: UPDATE_BILLING_ADDRESS,
    data
  };
}

export function updatePayment(data) {
  return {
    type: UPDATE_PAYMENT,
    data
  };
}
