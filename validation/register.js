const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions.
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "El campo de nombre es requerido.";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "El campo de email es requerido";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "El email no es válido.";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "El campo de contraseña es requerido.";
  }
  // Password confirmation is required
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "El campo de contraseña es requerido.";
  }
  // Some password requirements
  if (!Validator.isLength(data.password, {min: 6, max: 30 })) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }
  // Equal password and confirmation
  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Las contraseñas no coinciden.";
  }
  // return the errors
  return {
    errors, // the errors object
    isValis: isEmpty(errors)  // boolean
  };
};