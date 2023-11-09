// Import any required models here
const Recipe = require('../models/Recipe');

// Define your service methods
exports.getRecipes = async () => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'username email'); // Populate createdBy field with user info (replace 'username' and 'email' with the fields you need).

    return recipes;
  } catch (error) {
    throw new Error('Error fetching recipes: ' + error.message);
  }
};

exports.saveRecipe = async (title, description, createdBy) => {
  const newRecipe = new Recipe({
    title,
    description,
    createdBy
  });

  return await newRecipe.save();
};

exports.deleteWithEmptyTitle = async () => {
  return await Recipe.deleteMany({ description: null });
}