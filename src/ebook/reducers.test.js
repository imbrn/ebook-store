import { ebooks as ebooksReducer } from "./reducers";
import { FETCH_ALL_EBOOKS } from "./actionsTypes";
import { fakeEbooks } from "./fakeEbook";

test("default state", () => {
  expect(ebooksReducer(undefined, {})).toEqual([]);
});

test("handle FETCH_ALL_EBOOKS with success", () => {
  const ebooks = fakeEbooks(10);
  expect(
    ebooksReducer([], { type: FETCH_ALL_EBOOKS, status: "success", ebooks })
  ).toEqual(ebooks);
});
