import personaDataValidation from "./validation/personalData";
import billingAddressValidation from "./validation/billingAddress";
import creditCardValidation from "./validation/creditCard";

export function hasEbooksSelected(purchase) {
  return purchase && purchase.ebooks && purchase.ebooks.length > 0;
}

export function isPersonalDataComplete(purchase) {
  return purchase && personaDataValidation.test(purchase.personalData);
}

export function isBillingAddressComplete(purchase) {
  return purchase && billingAddressValidation.test(purchase.billingAddress);
}

export function isPaymentComplete(purchase) {
  return (
    purchase &&
    purchase.payment &&
    (purchase.payment.method === "boleto" ||
      creditCardValidation.test(purchase.payment))
  );
}
