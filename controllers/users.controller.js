const { response } = require('express');

const getUsers = (req, res = response) => {
    res.json({
        msg: " get API - controller"
    })
}

const postUsers = (req, res = response) => {
    res.json({
        msg: "post API- controller"
    })
}
const putUsers = (req, res = response) => {
    res.json({
        msg: "put API- controller"
    })
}
const patchUsers = (req, res = response) => {
    res.json({
        msg: "patch API- controller"
    })
}
const deleteUsers = (req, res = response) => {
    res.json({
        msg: "delete API- controller"
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
}