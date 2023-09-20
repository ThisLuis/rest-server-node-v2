const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res=response, next ) => {
  
  const token = req.header('x-token');

  if(!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    });
  }

  try{

    // verificar el jwt
    // obtiene el uid del token hasheado
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    // Leer el usuario que corresponda al uid
    const user = await User.findById( uid );

    // Si el usuario no existe
    if( !user ) {
      return res.status(401).json({
        msg: 'Token no valido - usuario no existe en la bd'
      })
    }

    // Verificar si el uid tiene estado true
    if( !user.status) {
      return res.status(401).json({
        msg: 'Token no valido - usuario con status false'
      })
    }


    req.user = user;
    
    next();

  } catch(error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no valido'
    });
  }


}

module.exports = {
  validateJWT,
}