import configureMockStore from "redux-mock-store";
import reduxThunk from "redux-thunk";
import { fetchAllEbooks } from "./actions";
import { FETCH_ALL_EBOOKS } from "./actionsTypes";
import { setService } from "../service";
import { fakeEbooks } from "./fakeEbook";

let mockStore;

beforeAll(() => {
  mockStore = configureMockStore([reduxThunk]);
});

describe("fetchAllEbooks", () => {
  test("success", async () => {
    const store = mockStore({});
    const ebooks = fakeEbooks(10);

    setService({
      fetchAllEbooks: () => Promise.resolve(ebooks)
    });

    await store.dispatch(fetchAllEbooks());

    expect(store.getActions()).toEqual([
      { type: FETCH_ALL_EBOOKS, status: "request" },
      { type: FETCH_ALL_EBOOKS, status: "success", ebooks }
    ]);
  });

  test("fail", async () => {
    const store = mockStore({});
    setService({
      fetchAllEbooks: () => Promise.reject("Error")
    });

    await store.dispatch(fetchAllEbooks());

    expect(store.getActions()).toEqual([
      { type: FETCH_ALL_EBOOKS, status: "request" },
      { type: FETCH_ALL_EBOOKS, status: "fail", cause: "Error" }
    ]);
  });
});
