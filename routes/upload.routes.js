const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFiles } = require('../controllers/upload.controller');

const router = Router();

router.post('/', uploadFiles);

module.exports = router;