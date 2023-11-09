const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const RecipeService = require('../services/RecipeService');
// Create a new recipe
exports.getRecipes = async (req, res) => {
  try {
    const allRecepes = await RecipeService.getRecipes();
    res.status(201).json(allRecepes);
  } catch (err) {
    console.error('Error saving the recipe:', err);
    res.status(500).json({ error: 'Error saving the recipe' });
  }
};


exports.createRecipe = async (req, res) => {
  const { title, description } = req.body;
  const createdBy = req.userId;

  try {
    const savedRecipe = await RecipeService.saveRecipe(title, description, createdBy);
    console.log('Recipe saved successfully.');
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('Error saving the recipe:', err);
    res.status(500).json({ error: 'Error saving the recipe' });
  }
};


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