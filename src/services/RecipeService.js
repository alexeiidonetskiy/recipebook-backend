// Import any required models here
const Recipe = require('../models/Recipe');

// Define your service methods
exports.getRecipes = async () => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: 'desc' });

    return recipes;
  } catch (error) {
    throw new Error('Error fetching recipes: ' + error.message);
  }
};

exports.saveRecipe = async (title, description, createdBy, image) => {
  const newRecipe = new Recipe({
    title,
    description,
    createdBy,
    image
  });

  return await newRecipe.save();
};

exports.deleteById = async (id) => {
  return await Recipe.deleteOne({ _id: id });
}

exports.deleteWithEmptyTitle = async () => {
  return await Recipe.deleteMany({ description: null });
}