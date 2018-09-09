import {
  TOGGLE_EBOOK_SELECTION,
  UPDATE_PERSONAL_DATA,
  UPDATE_BILLING_ADDRESS,
  UPDATE_PAYMENT,
  BUY
} from "./actionsTypes";

import { getService } from "../service";

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

export function buy() {
  return (dispatch, getState) => {
    dispatch(onBuy("request"));

    return getService()
      .buy(getState().purchase)
      .then(result => {
        dispatch(onBuy("success", { purchaseId: result.id }));
      })
      .catch(cause => {
        dispatch(onBuy("fail", { cause }));
      });
  };
}

function onBuy(status, props = {}) {
  return {
    type: BUY,
    status,
    ...props
  };
}
