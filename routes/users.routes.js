const { Router }   = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { 
    getUsers,
    putUsers,
    postUsers,
    patchUsers,
    deleteUsers

} = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password 6 length min').isLength({ min: 6}),
    check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email', 'el email no es valido').isEmail(),
    validateFields,
] ,postUsers)

router.delete('/', deleteUsers)

router.patch('/', patchUsers)

module.exports = router;