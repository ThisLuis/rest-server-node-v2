const { Category } = require('../models/');

const getCategories = (req, res) => {
  res.send('ok friend');
}

const getCategoryById = (req, res) => {
  res.send('by id')
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

const updateCategory = (req, res) => {
  res.send('put')  
}

const deleteCategory = (req, res) => {
  res.send('delete')  
}


module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};