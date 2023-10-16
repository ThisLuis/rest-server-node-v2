const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const { allowedCollections } = require('../helpers');
const { uploadFiles, updateImage } = require('../controllers/upload.controller');

const router = Router();

router.post('/', uploadFiles);

router.put('/:collection/:id', [
  check('id', 'is not mongoid valid').isMongoId(),
  check('collection').custom( c => allowedCollections( c, ['users', 'products'])),
  validateFields
], updateImage);

module.exports = router;