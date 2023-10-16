const { response } = require('express');

const { uploadFile } = require('../helpers');

const uploadFiles = async( req, res = response ) => {

  if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
    res.status(400).json({msg: 'No viene el archivo'});
    return
  }

  
  try {
    // const fullPath = await uploadFile( req.files );
    // const name = await uploadFile( req.files, ['md', 'txt'], 'textos' );
    const name = await uploadFile( req.files, undefined, 'images' );
    res.json(name);
  } catch( msg ) {
    res.status(400).json(msg);
  }
  

 
}

module.exports = {
  uploadFiles,
};