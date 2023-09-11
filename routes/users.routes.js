const { Router }   = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { existsEmail,
        isValidRole,
        existsUserById
} = require('../helpers/db-validators');

const { 
    getUsers,
    putUsers,
    postUsers,
    patchUsers,
    deleteUsers

} = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);

router.put('/:id', [
    check('id', 'No es un ID valido de mongo').isMongoId(),
    check('id').custom( existsUserById ),
    check('role').custom( isValidRole ),
    check('name', 'El usuario debe ser mayor a 6 caracteres').isLength({ min: 6}),
    validateFields
],putUsers);

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password 6 length min').isLength({ min: 6}),
    check('email', 'el email no es valido').isEmail(),
    check('email').custom( existsEmail),
    // check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole),
    validateFields,
] ,postUsers)

router.delete('/:id', [
    check('id', 'No es un ID valido de mongo').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
],deleteUsers)

router.patch('/', patchUsers)

module.exports = router;