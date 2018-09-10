import { fakeEbooks } from "../ebook/fakeEbook";
import { hasEbooksSelected } from "./selectors";

test("hasEbooksSelected", () => {
  expect(hasEbooksSelected()).toBeFalsy();
  expect(hasEbooksSelected({})).toBeFalsy();

  expect(
    hasEbooksSelected({
      ebooks: []
    })
  ).toBeFalsy();

  expect(
    hasEbooksSelected({
      ebooks: fakeEbooks(2)
    })
  ).toBeTruthy();
});
