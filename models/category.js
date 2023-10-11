const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, 'status is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

});

CategorySchema.methods.toJSON = function() {
  const { __v, status, ...data } = this.toObject();
  return data;
}

module.exports = model('Category', CategorySchema);