import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { EbooksList, EbookItem } from "./EbooksList";
import Ebook from "../../ebook/Ebook";
import { fakeEbooks, fakeEbook } from "../../ebook/fakeEbook";

afterEach(cleanup);

describe("EbooksList", () => {
  test("renders correctly", () => {
    const ebooks = fakeEbooks(10);
    const selectedEbooks = [ebooks[0], ebooks[1], ebooks[5], ebooks[8]];
    const { container } = render(
      <EbooksList ebooks={ebooks} selectedEbooks={selectedEbooks} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("total price sum", () => {
    const ebooks = [
      new Ebook({ id: 1, name: "One", price: 1050 }),
      new Ebook({ id: 2, name: "Two", price: 3209 }),
      new Ebook({ id: 3, name: "Three", price: 1125 })
    ];
    const { getByText } = render(
      <EbooksList ebooks={ebooks} selectedEbooks={[ebooks[0], ebooks[2]]} />
    );
    expect(getByText("R$ 21,75")).toBeDefined();
  });

  test("handle ebook toggle selection", () => {
    const toggleEbookSelection = jest.fn();
    const ebooks = fakeEbooks(5);
    const { getByText } = render(
      <EbooksList ebooks={ebooks} toggleEbookSelection={toggleEbookSelection} />
    );
    const ebookEl = getByText(ebooks[1].name);
    const ebookCheckBox = ebookEl.parentElement.parentElement.querySelector(
      "[type='checkbox']"
    );
    fireEvent.click(ebookCheckBox);
    expect(toggleEbookSelection.mock.calls).toEqual([[ebooks[1]]]);
  });
});

describe("EbookItem", () => {
  test("renders correctly", () => {
    const ebook = fakeEbook(15);
    const { container } = render(<EbookItem ebook={ebook} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
