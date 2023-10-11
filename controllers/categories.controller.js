const { Category } = require('../models/');

// paginate, total - populate
const getCategories = async(req, res) => {
  const { limit } = req.query;
  const query = { status: true };

  const [ total, categories ] = await Promise.all([
    Category.countDocuments( query ),
    Category.find( query )
      .populate('user')
      .limit( Number(limit ))
  ]);

  res.json({
    total,
    categories
  });
}

// populate()
const getCategoryById = async(req, res) => {
 
  const { id } = req.params;

  const category = await Category.findById( id ).populate('user', 'name');

  res.json({
    category
  })

}

const createCategory = async(req, res) => {
  
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if(categoryDB) {
    return res.status(400).json({
      msg: `Category ${ categoryDB.name } already exists in db`,
    });
  }

  const data = {
    name,
    user: req.user._id
  }

  const category = new Category(data);
  await category.save();

  res.status(200).json(category);
  
}

//
const updateCategory = async(req, res) => {
  const { id } = req.params;
  const { user, _id, status,  ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json({
    user,
    category
  });
}

const deleteCategory = async(req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

  res.status(200).json({
    category
  });
}


module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};