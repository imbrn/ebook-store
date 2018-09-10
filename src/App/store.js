import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import ebooksReducer from "../ebook/reducers";
import purchaseReducer from "../purchase/reducers";

const store = createStore(
  combineReducers({
    ebooks: ebooksReducer,
    purchase: purchaseReducer
  }),
  applyMiddleware(reduxThunk)
);

export default store;
