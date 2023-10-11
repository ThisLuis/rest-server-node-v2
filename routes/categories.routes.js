const { Router } = require('express');
const { check } = require('express-validator');

const { existsCategoryById } = require('../helpers/db-validators');

const { 
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const router = Router();

// get categories
router.get('/', getCategories);

// get category by id
router.get('/:id', [
  check('id', 'id no es un mongodId valido').isMongoId(),
  check('id').custom(existsCategoryById),
  validateFields
],getCategoryById)

//create category - private - any person with valid token
router.post('/', [
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  validateFields
],createCategory);

// update category - private - any person with valid token
router.put('/:id', [
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  check('id', 'id is not a mongoId').isMongoId(),
  check('id').custom( existsCategoryById),
  validateFields
],updateCategory);

//delete category - admin
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'id is not a mongoId').isMongoId(),
  check('id').custom( existsCategoryById),
  validateFields
],deleteCategory);


module.exports = router;