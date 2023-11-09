const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/RecipeController');
const multer = require('multer');


// Storage configuration for multer
const storage = multer.memoryStorage(); // Store files in memory, adjust as needed
const upload = multer({ storage: storage });

// Recipes
router.get('/', recipeController.getRecipes)
router.post('/', upload.single('image'), recipeController.createRecipe);
router.delete('/:id', recipeController.deleteRecipeById);
router.delete('/', recipeController.deleteEmptyTitle);

module.exports = router;


