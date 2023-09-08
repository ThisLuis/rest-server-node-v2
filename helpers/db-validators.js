const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async( role = '' ) => {
    const existsRole = await Role.findOne({ role });
    if( !existsRole ) {
        throw new Error(`El role ${ role } no esta registrado en la base de datos`);
    }
}

const existsEmail = async(email) => {
  const existsEmail = await User.findOne({ email });
  if( existsEmail ) {
    throw new Error(`El email: ${ email } ya esta registrado en la base de datos`);
  }

}

const existsUserById = async( id ) => {
  const existsUser = await User.findById( id );
  if(!existsUser ) {
    throw new Error(`El id ${ id } no existe en la bd`);
  }
}


module.exports = {
    existsEmail,
    existsUserById,
    isValidRole,
}