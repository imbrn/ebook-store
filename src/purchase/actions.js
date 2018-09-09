import { TOGGLE_EBOOK_SELECTION, BUY } from "./actionsTypes";

import { getService } from "../service";

export function toggleEbookSelection(ebook) {
  return {
    type: TOGGLE_EBOOK_SELECTION,
    ebook
  };
}

export function buy(data) {
  return dispatch => {
    dispatch(onBuy("request", { data }));

    return getService()
      .buy(data)
      .then(result => {
        dispatch(onBuy("success", { purchaseId: result.id, data }));
      })
      .catch(cause => {
        dispatch(onBuy("fail", { cause, data }));
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
