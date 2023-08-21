const { Router }   = require('express');
const { 
    getUsers,
    putUsers,
    postUsers,
    patchUsers,
    deleteUsers

} = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);

router.put('/put', putUsers);

router.post('/post', postUsers)

router.delete('/delete', deleteUsers)

router.patch('/patch', patchUsers)

module.exports = router;