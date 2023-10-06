const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {
  const { email, password } = req.body;

  try{
    // Verificar si el email existe
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
        msg: 'User/password no son correctos - email'
      });
    }

    // Si el usuario esta activo
    if( !user.status ){
      return res.status(400).json({
        msg: 'Usuario/password no son correctos - status: false'
      })
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) {
      return res.status(400).json({
        msg: 'Usuario/password no son correctos - password not match'
      })
    }

    // Generar el JWT

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })

  } catch(error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }

  
}

const googleSignIn = async(req, res = response) => {
  
  const { id_token } = req.body;

  try {

    const googleUser = await googleVerify( id_token );
    console.log(googleUser);

    res.json({
      msg: 'ok!',
      id_token
    })
    
  } catch (error) {
    json.status(400).json({
      ok: false,
      msg: 'el token no se pudo verificar'
    })
  }

}

module.exports = {
  login,
  googleSignIn
}