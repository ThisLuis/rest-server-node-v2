const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

// Models
const User = require('../models/user');


// query params
const getUsers = async(req, res = response) => {

    // const { q, type_user, apikey, user = 'no user x-x' } = req.query;
    const { from = 0, limit } = req.query;
    const query = { status: true };
    // const users = await User.find().skip(Number(from)).limit(Number(limit));
    // const total = await User.countDocuments();

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(from))
            .limit( Number(limit))
    ]);

    res.json({
        total,
        users
    })
}

// body
const postUsers = async(req, res = response) => {

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt);

  // Guardar en BD
  await user.save();

  res.status(201).json({
    user,
  })
}

// parametros de segmento
const putUsers = async(req, res = response) => {


    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;
    console.log(rest);

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );

    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user);
}
const patchUsers = (req, res = response) => {
    res.json({
        msg: "patch API- controller"
    })
}
const deleteUsers = async(req, res = response) => {
    const { id } = req.params;

    const uid = req.uid;
    // delete phisical
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate(id, { status: false });
    res.json({
        user,
        uid
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
}