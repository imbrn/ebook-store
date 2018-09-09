import { FETCH_ALL_EBOOKS } from "./actionsTypes";

export function ebooks(state = [], action) {
  switch (action.type) {
    case FETCH_ALL_EBOOKS:
      return onFetchAllEbooks(state, action);
    default:
      return state;
  }
}

function onFetchAllEbooks(state, action) {
  switch (action.status) {
    case "success":
      return action.ebooks;
    default:
      return state;
  }
}

export function status(state = { kind: "initial" }, action) {
  switch (action.type) {
    case FETCH_ALL_EBOOKS:
      return onStatus(action);
    default:
      return state;
  }
}

function onStatus(action) {
  switch (action.status) {
    case "fail":
      return {
        kind: "fail",
        cause: action.cause
      };
    default:
      return {
        kind: action.status
      };
  }
}

export default ebooks;
