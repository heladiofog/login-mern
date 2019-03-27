const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions.
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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
  
  // return the errors
  return {
    errors, // the errors object
    isValid: isEmpty(errors)  // boolean
  };
};