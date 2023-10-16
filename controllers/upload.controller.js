const { response } = require('express');

const { uploadFile } = require('../helpers');
const { Product, User } = require('../models');

const uploadFiles = async( req, res = response ) => {

  try {
    // const fullPath = await uploadFile( req.files );
    // const name = await uploadFile( req.files, ['md', 'txt'], 'textos' );
    const name = await uploadFile( req.files, undefined, 'images' );
    res.json(name);
  } catch( msg ) {
    res.status(400).json(msg);
  }
  

 
}

const updateImage = async(req, res = response) => {
  
  const { id, collection } = req.params;
  let model;

  switch( collection) {
    case 'users':
      model = await User.findById(id);
      if ( !model ) {
        return res.status(400).json({
          msg: `Don't exists user with id: ${ id }`
        })
      }
    break;

    case 'products':
      model = await Product.findById( id );
      if ( !model ) {
        return res.status(400).json({
          msg: `Don't exists prodcut with id: ${ id }`
        })
      }
    break;

    default:
      return res.status(400).json({msg: 'No valide esto'})
  }

  const name = await uploadFile( req.files, undefined, collection );
  model.image = name;
  await model.save();


  res.json(model);

};

module.exports = {
  uploadFiles,
  updateImage
};