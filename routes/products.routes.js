const { Router } = require('express');
const { check } = require('express-validator');

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const { existsProductById, existsProduct } = require('../helpers/db-validators');

const router = Router();

router.get('/', getProducts);


/* Get product by id */
router.get('/:id', [
  check('id', 'id is not a valid mongoId').isMongoId(),
  check('id').custom(existsProductById),
  validateFields
],getProductById);

/* Create product */
router.post('/', [
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  check('category', 'is not mongoId valid').isMongoId(),
  validateFields
],createProduct);

/* Update product */
router.put('/:id', [
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  check('id', 'is not a valid mongoId').isMongoId(),
  check('id').custom(existsProductById),
],updateProduct);

/* Delete product by id */
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'is not a valid mongoId').isMongoId(),
  check('id').custom(existsProductById),
  validateFields
],deleteProduct);


module.exports = router;