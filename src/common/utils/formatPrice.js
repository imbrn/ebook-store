function formatPrice(price) {
  const priceAsString = (price / 100).toFixed(2).replace(".", ",");
  return `R$ ${priceAsString}`;
}

export default formatPrice;
