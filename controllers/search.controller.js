const { response } = require ('express');
const { ObjectId } = require('mongoose').Types;

const { Category, Product, User } = require ('../models');

const COLLECTIONS_VALIDS = [
  'users',
  'products',
  'categories',
  'roles'
];

const searchUsers = async( query = '', res = response ) => {
  const isMongoID = ObjectId.isValid( query );

  if( isMongoID ) {
    const user = await User.findById( query );
    return res.status(200).json({
      results: ( user ) ? [ user ] : []
    })
  }

  const regex = new RegExp( query, 'i' );
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }]
  });

  res.json({
    results: users
  })

}

const searchCategories = async(query = '', res = response ) => {
  const isMongoID = ObjectId.isValid( query );

  if( isMongoID ) {
    const category = await Category.findById( query );
    return res.status(200).json({
      results: ( category ) ? [ category ] : []
    });
  }

  const regex = new RegExp( query, 'i' );
  const categories = await Category.find({ name: regex, $and: [{ status: true }]});

  res.json({
    results: categories
  })
}

const searchProducts = async(query = '', res = response ) => {
  const isMongoID = ObjectId.isValid( query );

  if( isMongoID ) {
    const product = await Product.findById( query ).populate('category', 'name');
    return res.status(200).json({
      results: ( product ) ? [ product ] : []
    });
  }

  const regex = new RegExp( query, 'i' );
  const products = await Product.find({ name: regex, $and: [{ status: true }]})
                        .populate('category', 'name');

  res.json({
    results: products
  })
}



const search = (req, res = response) => {

  const { collection, query } = req.params;

  if( !COLLECTIONS_VALIDS.includes( collection )) {
    return res.status(400).json({
      msg: `Collections valids are: ${ COLLECTIONS_VALIDS }`
    });
  }

  switch ( collection ) {

    case "users":
      searchUsers(query, res);
    break;
    
    case 'categories':
      searchCategories(query, res);
    break;

    case 'products':
      searchProducts(query, res);
    break;

    default:
      res.status(500).json({
        msg: 'Query no realizada aun'
      })
  }

}

module.exports = {
  search
};