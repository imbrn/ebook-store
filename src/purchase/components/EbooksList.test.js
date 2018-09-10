import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { EbooksList, EbookItem } from "./EbooksList";
import Ebook from "../../ebook/Ebook";
import { fakeEbooks, fakeEbook } from "../../ebook/fakeEbook";

afterEach(cleanup);

describe("EbooksList", () => {
  test("renders correctly", () => {
    const ebooks = {
      items: fakeEbooks(4)
    };

    const purchase = {
      ebooks: [ebooks.items[1], ebooks.items[3]]
    };

    const { container } = render(
      <EbooksList ebooks={ebooks} purchase={purchase} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("total price sum", () => {
    const ebooks = {
      items: [
        new Ebook({ id: 1, name: "One", price: 1050 }),
        new Ebook({ id: 2, name: "Two", price: 3209 }),
        new Ebook({ id: 3, name: "Three", price: 1125 })
      ]
    };

    const purchase = {
      ebooks: [ebooks.items[0], ebooks.items[2]]
    };
    const { getByText } = render(
      <EbooksList ebooks={ebooks} purchase={purchase} />
    );
    expect(getByText("R$ 21,75")).toBeDefined();
  });

  test("handle ebook toggle selection", () => {
    const toggleEbookSelection = jest.fn();

    const ebooks = {
      items: fakeEbooks(5)
    };

    const purchase = {
      ebooks: []
    };

    const { getByText } = render(
      <EbooksList
        ebooks={ebooks}
        purchase={purchase}
        toggleEbookSelection={toggleEbookSelection}
      />
    );

    const ebookEl = getByText(ebooks.items[1].name);
    const ebookCheckBox = ebookEl.parentElement.parentElement.querySelector(
      "[type='checkbox']"
    );
    fireEvent.click(ebookCheckBox);
    expect(toggleEbookSelection.mock.calls).toEqual([[ebooks.items[1]]]);
  });
});

describe("EbookItem", () => {
  test("renders correctly", () => {
    const ebook = fakeEbook(15);
    const { container } = render(<EbookItem ebook={ebook} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
