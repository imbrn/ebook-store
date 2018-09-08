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

test("fetchAllEbooks", async () => {
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
