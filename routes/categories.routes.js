const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { getCategories } = require('../controllers/categories.controller');

const router = Router();

router.get('/', (req, res) => {
  res.json('todo ok')
});

module.exports = router;