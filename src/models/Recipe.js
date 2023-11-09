const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe