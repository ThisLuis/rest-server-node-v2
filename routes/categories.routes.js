const { Router } = require('express');
const { check } = require('express-validator');

const { getCategories } = require('../controllers/categories.controller');

const router = Router();

router.get('/', getCategories)

module.exports = router;