const { response } = require('express');

const uploadFiles = ( req, res = response ) => {
  res.json('ok');
}

module.exports = {
  uploadFiles,
};