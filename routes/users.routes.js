const { Router }   = require('express');
const { check } = require('express-validator');
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
    check('email', 'el email no es valido').isEmail(),
] ,postUsers)

router.delete('/', deleteUsers)

router.patch('/', patchUsers)

module.exports = router;