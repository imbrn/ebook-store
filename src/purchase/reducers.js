import { combineReducers } from "redux";

import { TOGGLE_EBOOK_SELECTION, BUY } from "./actionsTypes";

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

export function status(state = { kind: "initial" }, action) {
  switch (action.type) {
    case BUY:
      return onStatus(action);
    default:
      return state;
  }
}

function onStatus(action) {
  switch (action.status) {
    case "success":
      return {
        kind: "success",
        purchaseId: action.purchaseId,
        data: action.data
      };
    case "fail":
      return {
        kind: "fail",
        cause: action.cause,
        data: action.data
      };
    default:
      return {
        kind: action.status,
        data: action.data
      };
  }
}

export default combineReducers({
  ebooks,
  status
});
