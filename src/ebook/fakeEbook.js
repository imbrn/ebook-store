import Ebook from "./Ebook";

export function fakeEbook(id) {
  return new Ebook({
    id,
    name: `Ebook ${id}`,
    description: `The ebook ${id}`,
    price: id * 10000
  });
}

export function fakeEbooks(amount = 10, firstId = 1) {
  return Array(amount)
    .fill()
    .map(() => fakeEbook(firstId++));
}
