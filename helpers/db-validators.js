const {
  Category,
  Product, 
  Role
} = require('../models');

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

const existsCategoryById = async(id) => {
  const existsCategory = await Category.findById( id );
  if(!existsCategory ) {
    throw new Error(`La categoria no existe`);
  }
}

const existsProductById = async(id) => {
  const existsProductById = await Product.findById(id);
  if(!existsProductById ) {
    throw new Error('El producto no existe')
  }
}

const existsProduct = async( name ) => {
  const existsProduct = await Product.findOne({name});
  if(existsProduct) {
    throw new Error(`El producto ${ name } ya esta registrado`)
  }
}

const allowedCollections = (collection = '', collections = []) => {
  const includeCollection = collections.includes( collection );
  if ( !includeCollection ) {
    throw new Error(`Collection isn't allowed: ${ collection }: ${ collections}`);
  }

  return true;
}


module.exports = {
    existsEmail,
    existsUserById,
    isValidRole,
    existsCategoryById,
    existsProductById,
    existsProduct,
    allowedCollections
}