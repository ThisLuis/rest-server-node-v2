const { response } = require('express');

// Models
const User = require('../models/user');


// query params
const getUsers = (req, res = response) => {

    const { q, type_user, apikey, user = 'no user x-x' } = req.query;

    res.json({
        msg: " get API - controller",
        q,
        type_user,
        apikey
    })
}

// body
const postUsers = async(req, res = response) => {

  const dataUser = req.body;
  const user = new User(dataUser);
  await user.save();

  res.status(201).json({
    user,
  })
}

// parametros de segmento
const putUsers = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: "put API- controller",
        "id": id
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