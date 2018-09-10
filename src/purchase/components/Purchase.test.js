import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { render, cleanup } from "react-testing-library";
import Purchase from "./Purchase";
import { fakeEbooks } from "../../ebook/fakeEbook";

jest.mock("nanoid", () => {
  let nextId = 1;
  return () => nextId++;
});

afterEach(cleanup);

const mockStore = configureMockStore([reduxThunk]);

describe("renders correctly", () => {
  test("fetching ebooks", () => {
    const ebooks = {
      status: {
        kind: "request"
      }
    };

    const store = mockStore({ ebooks });

    const { container } = render(
      <Provider store={store}>
        <Purchase />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("fetching ebooks failed", () => {
    const ebooks = {
      status: {
        kind: "fail",
        cause: "Some error"
      }
    };

    const store = mockStore({ ebooks });

    const { container } = render(
      <Provider store={store}>
        <Purchase />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe("purchasing", () => {
    let ebooks;

    beforeEach(() => {
      ebooks = {
        items: fakeEbooks(10),
        status: {
          kind: "success"
        }
      };
    });

    test("success", () => {
      const purchase = {
        status: {
          kind: "success"
        }
      };

      const store = mockStore({ ebooks, purchase });

      const { container } = render(
        <Provider store={store}>
          <Purchase />
        </Provider>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test("fail", () => {
      const purchase = {
        status: {
          kind: "fail"
        }
      };

      const store = mockStore({ ebooks, purchase });

      const { container } = render(
        <Provider store={store}>
          <Purchase />
        </Provider>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test("initial", () => {
      const purchase = {
        status: {
          kind: "initial"
        },
        ebooks: []
      };

      const store = mockStore({ ebooks, purchase });

      const { container } = render(
        <Provider store={store}>
          <Purchase />
        </Provider>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
