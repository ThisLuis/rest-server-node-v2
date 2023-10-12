const { response } = require('express');
const  { Product } = require('../models');

const getProducts = async(req, res = response) => {

  const { limit } = req.query;
  const query = { status: true };

  const [ total, products ] = await Promise.all([
    Product.countDocuments( query ),
    Product.find( query )
      .populate('user')
      .limit(Number(limit))
  ]);

  res.json({
    total, 
    products
  })

}

const getProductById = async(req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.json({
    product
  })

}

const createProduct = async(req, res = response) => {
  const { user, status, ...info } = req.body;


  const productDB = await Product.findOne({ name: info.name });

  // not working :(
  if( productDB ) {
    return res.status(400).json({
      msg: `Producto; ${ productDB.name } already exists in db`
    })
  }
  
  const data = {
    ...info,
    name: info.name.toUpperCase(),
    user: req.user._id,
  }

  const newProduct = new Product(data);
  await newProduct.save();

  res.status(201).json({
    newProduct,
    user, 
  });

};

const updateProduct = async(req, res = response) => {
  
  const { id } = req.params;
  const { _id, status, user,...data } = req.body;

  if( data.name ) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;


  const productUpdate = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json({
    productUpdate,
  });
}

const deleteProduct = async(req, res = response) => {
  const { id } = req.params;

  const productDelete = await Product.findByIdAndUpdate(id, {status: false}, { new: true });

  res.status(200).json({
    productDelete
  })
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};