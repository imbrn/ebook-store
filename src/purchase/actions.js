import { TOGGLE_EBOOK_SELECTION, REQUEST_BUY } from "./actionsTypes";

import { getService } from "../service";

export function toggleEbookSelection(ebook) {
  return {
    type: TOGGLE_EBOOK_SELECTION,
    ebook
  };
}

export function requestBuy(data) {
  return (dispatch, getState) => {
    const ebooks = getState().purchase.ebooks;

    dispatch(onRequestBuy("request", { data, ebooks }));

    return getService()
      .requestBuy(ebooks, data)
      .then(result => {
        dispatch(
          onRequestBuy("success", { purchaseId: result.id, data, ebooks })
        );
      })
      .catch(cause => {
        dispatch(onRequestBuy("fail", { cause, data, ebooks }));
      });
  };
}

function onRequestBuy(status, props = {}) {
  return {
    type: REQUEST_BUY,
    status,
    ...props
  };
}
