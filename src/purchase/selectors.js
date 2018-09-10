export function hasEbooksSelected(purchase) {
  return purchase && purchase.ebooks && purchase.ebooks.length > 0;
}
