import { ebooks as ebooksReducer, status } from "./reducers";
import { FETCH_ALL_EBOOKS } from "./actionsTypes";
import { fakeEbooks } from "./fakeEbook";

describe("ebooks", () => {
  test("default state", () => {
    expect(ebooksReducer(undefined, {})).toEqual([]);
  });

  test("handle FETCH_ALL_EBOOKS with success", () => {
    const ebooks = fakeEbooks(10);
    expect(
      ebooksReducer([], { type: FETCH_ALL_EBOOKS, status: "success", ebooks })
    ).toEqual(ebooks);
  });
});

describe("status", () => {
  test("default state", () => {
    expect(status(undefined, {})).toEqual({ kind: "initial" });
  });

  test("handle FETCH_ALL_EBOOKS request", () => {
    expect(
      status(
        { kind: "initial" },
        {
          type: FETCH_ALL_EBOOKS,
          status: "request"
        }
      )
    ).toEqual({
      kind: "request"
    });
  });

  test("handle FETCH_ALL_EBOOKS success", () => {
    expect(
      status({ kind: "request" }, { type: FETCH_ALL_EBOOKS, status: "success" })
    ).toEqual({
      kind: "success"
    });
  });

  test("handle FETCH_ALL_EBOOKS fail", () => {
    expect(
      status(
        { kind: "request" },
        { type: FETCH_ALL_EBOOKS, status: "fail", cause: "Error" }
      )
    ).toEqual({
      kind: "fail",
      cause: "Error"
    });
  });
});
