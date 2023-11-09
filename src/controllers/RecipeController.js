const RecipeService = require('../services/RecipeService');
const { uploadImageToS3 } = require('../utils/s3-bucket-uploader');
const { generateImageName } = require('../utils/util');

exports.getRecipes = async (req, res) => {
  try {
    const allRecipes = await RecipeService.getRecipes();
    res.status(201).json(allRecipes);
  } catch (err) {
    console.error('Error saving the recipe:', err);
    res.status(500).json({ error: 'Error saving the recipe' });
  }
};

exports.createRecipe = async (req, res) => {
  const { title, description } = req.body;
  const createdBy = req.userId;
  const imageFile = req.file;

  try {
    const imageName = generateImageName();
    const uploadResult = await uploadImageToS3(imageFile.buffer, imageFile.mimetype, imageName);
    const imageUrl = uploadResult.Location;

    const savedRecipe = await RecipeService.saveRecipe(title, description, createdBy, imageUrl);

    console.log('Recipe saved successfully.');
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('Error saving the recipe:', err);
    res.status(500).json({ error: 'Error saving the recipe' });
  }
};



exports.deleteRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await RecipeService.deleteById(id);
    console.log('result', result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No matching recipes found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    console.error('Error deleting recipes:', err);
    res.status(500).json({ error: 'Error deleting recipes' });
  }
}

exports.deleteEmptyTitle = async (res) => {
  try {
    const result = await RecipeService.deleteWithEmptyTitle();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No matching recipes found' });
    }

    res.status(200).json({ message: 'Recipes deleted successfully' });
  } catch (err) {
    console.error('Error deleting recipes:', err);
    res.status(500).json({ error: 'Error deleting recipes' });
  }
}