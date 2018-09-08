import v8n from "v8n";

export const zipCode = v8n()
  .not.null()
  .not.undefined()
  .string()
  .pattern(/^[\d]{8}$/);

export const state = v8n()
  .not.null()
  .not.undefined()
  .string()
  .minLength(2);

export const city = v8n()
  .not.null()
  .not.undefined()
  .string()
  .minLength(2);

export const address = v8n()
  .not.null()
  .not.undefined()
  .string()
  .minLength(1);

export default v8n().schema({
  zipCode,
  state,
  city,
  address
});
