const dbValidator  = require('./db-validators');
const generateJQT  = require('./generate-jwt');
const googleVerify = require('./google-verify')
const uploadFile   = require('./upload-file');

module.exports = {
  ...dbValidator,
  ...generateJQT,
  ...googleVerify,
  ...uploadFile,
};