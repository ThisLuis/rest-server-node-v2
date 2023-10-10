const { Router } = require('express');
const { check } = require('express-validator');

const { 
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');
const { validateJWT, validateFields } = require('../middlewares');

const router = Router();

// get categories
router.get('/', getCategories);

// get category by id
router.get('/:id', getCategoryById)

//create category - private - any person with valid token
router.post('/', [
  validateJWT,
  check('name', 'name is required').not().isEmpty(),
  validateFields
],createCategory);

// update category - private - any person with valid token
router.put('/:id', updateCategory);

//delete category - admin
router.delete('/:id', deleteCategory);


module.exports = router;