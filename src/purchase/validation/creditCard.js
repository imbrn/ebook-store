import v8n from "v8n";

v8n.extend({
  instanceOf: theClass => value => value instanceof theClass
});

export const cardholderName = v8n()
  .not.undefined()
  .not.null()
  .string()
  .minLength(2);

export const visa = v8n().pattern(/^4[0-9]{12}(?:[0-9]{3})?$/);

export const master = v8n().pattern(
  /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
);

export const cardNumber = v8n()
  .not.undefined()
  .not.null()
  .string()
  .passesAnyOf(visa, master);

export const dueDate = v8n()
  .not.undefined()
  .not.null()
  .instanceOf(Date);

export const cvv = v8n()
  .not.undefined()
  .not.null()
  .pattern(/^[0-9]{3,4}$/);

export default v8n().schema({
  cardholderName,
  cardNumber,
  dueDate,
  cvv
});
