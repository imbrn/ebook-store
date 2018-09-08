import v8n from "v8n";

export const name = v8n()
  .not.null()
  .not.undefined()
  .string()
  .minLength(2);

export const cpf = v8n()
  .not.null()
  .not.undefined()
  .pattern(/^[\d]{11}$/);

export const email = v8n()
  .not.null()
  .not.undefined()
  .string()
  .pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

export default v8n().schema({
  name,
  cpf,
  email
});
