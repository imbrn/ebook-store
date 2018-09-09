import { getService } from "../service";
import { FETCH_ALL_EBOOKS } from "./actionsTypes";

export function fetchAllEbooks() {
  return dispatch => {
    dispatch(onFetchAllEbooks("request"));
    return getService()
      .fetchAllEbooks()
      .then(ebooks => dispatch(onFetchAllEbooks("success", { ebooks })))
      .catch(cause => dispatch(onFetchAllEbooks("fail", { cause })));
  };
}

function onFetchAllEbooks(status, props) {
  return {
    type: FETCH_ALL_EBOOKS,
    status,
    ...props
  };
}
