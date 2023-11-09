const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/RecipeController');

// Recipes
router.get('/', recipeController.getRecipes)
router.post('/', recipeController.createRecipe);
router.delete('/', recipeController.deleteEmptyTitle);

module.exports = router;


