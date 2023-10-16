const validateField      = require('../middlewares/validate-fields')
const validateJWT        = require('../middlewares/validate-jwt')
const validateRoles      = require('../middlewares/validate-roles')
const validateFile = require('../middlewares/validate-file');

module.exports = {
  ...validateField,
  ...validateJWT,
  ...validateRoles,
  ...validateFile
};