import {
  TOGGLE_EBOOK_SELECTION,
  UPDATE_PERSONAL_DATA,
  UPDATE_BILLING_ADDRESS,
  UPDATE_PAYMENT,
  BUY
} from "./actionsTypes";

export function ebooks(state = [], action) {
  switch (action.type) {
    case TOGGLE_EBOOK_SELECTION:
      return toggleEbookSelection(state, action);
    default:
      return state;
  }
}

function toggleEbookSelection(state, action) {
  const index = state.findIndex(ebook => ebook === action.ebook);
  if (~index) {
    const newState = state.slice();
    newState.splice(index, 1);
    return newState;
  } else {
    return [...state, action.ebook];
  }
}

export function personalData(state = {}, action) {
  switch (action.type) {
    case UPDATE_PERSONAL_DATA:
      return action.data;
    default:
      return state;
  }
}

export function billingAddress(state = {}, action) {
  switch (action.type) {
    case UPDATE_BILLING_ADDRESS:
      return action.data;
    default:
      return state;
  }
}

export function payment(state = {}, action) {
  switch (action.type) {
    case UPDATE_PAYMENT:
      return action.data;
    default:
      return state;
  }
}

export function status(state = { type: "initial" }, action) {
  switch (action.type) {
    case BUY:
      return onStatus(state, action);
    default:
      return state;
  }
}

function onStatus(state, action) {
  switch (action.status) {
    case "success":
      return {
        type: "success",
        purchaseId: action.purchaseId
      };
    default:
      return state;
  }
}
