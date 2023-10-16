const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

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

  // Clean previous images
  if (model.image ) {
    // delete server image
    const pathImage = path.join( __dirname, '../uploads', collection, model.image );
    if ( fs.existsSync( pathImage ) ) {
      fs.unlinkSync( pathImage );
    }
  }

  const name = await uploadFile( req.files, undefined, collection );
  model.image = name;
  await model.save();


  res.json(model);

};

const updateImageCloudinary = async(req, res = response) => {
  
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

  // Clean previous images
  if (model.image ) {
    const nameArr = model.image.split('/');
    const name = nameArr[ nameArr.length - 1];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = await req.files.file;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  model.image = secure_url;
  await model.save();


  res.json(model);

};


const showImage = async(req, res = response) => {


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

  // Clean previous images
  if (model.image ) {
    // delete server image
    const pathImage = path.join( __dirname, '../uploads', collection, model.image );
    if ( fs.existsSync( pathImage ) ) {
      return res.send( pathImage );
    }
  }


  const placeholderImage = path.join( __dirname, '../assets/no-image.jpg');
  console.log(placeholderImage);
  res.sendFile( placeholderImage );
}

module.exports = {
  uploadFiles,
  updateImage,
  updateImageCloudinary,
  showImage
};