import { FETCH_ALL_EBOOKS } from "./actionsTypes";

export function ebooks(state = [], action) {
  switch (action.type) {
    case FETCH_ALL_EBOOKS:
      return action.ebooks;
    default:
      return state;
  }
}
