const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFile } = require('../middlewares');
const { allowedCollections } = require('../helpers');
const { uploadFiles, updateImage, showImage } = require('../controllers/upload.controller');

const router = Router();

router.post('/', validateFile,uploadFiles);

router.put('/:collection/:id', [
  validateFile,
  check('id', 'is not mongoid valid').isMongoId(),
  check('collection').custom( c => allowedCollections( c, ['users', 'products'])),
  validateFields
], updateImage);

router.get('/:collection/:id', [
  check('id', 'el id debe de ser de mongo'),
  check('collection').custom( c => allowedCollections( c, ['users', 'products'])),
  validateFields
], showImage)

module.exports = router;