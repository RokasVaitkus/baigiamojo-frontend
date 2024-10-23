import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import UserService from '../services/user.service';
import AdminService from '../services/admin.service'; // Import AdminService


function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await UserService.getAllRecipes();
        if (response.data && response.data.length > 0) {
          setRecipes(response.data);
        } else {
          setMessage('No recipes available.');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setMessage('Failed to fetch recipes.');
      }
    };

    fetchRecipes();
  }, []);

  const handleEdit = (recipeId) => {
    navigate(`/edit-recipe/${recipeId}`); // Navigate to EditRecipe component with recipeId
  };

  const handleDelete = async (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await AdminService.deleteRecipeById(recipeId); // Call delete function
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId)); // Remove deleted recipe from state
        setMessage('Recipe deleted successfully.');
      } catch (error) {
        console.error('Error deleting recipe:', error);
        setMessage('Failed to delete recipe. Please try again.');
      }
    }
  };

  const handleImageUpload = (recipeId) => {
    navigate(`/upload-recipe-image/${recipeId}`); // Navigate to the image upload page with the recipeId
  };

  return (
    <div>
      <h2>All Recipes</h2>
      {message && <p className="message">{message}</p>}
      {recipes.length > 0 ? (
        <div className="scrollable-recipes-container"> {/* Scrollable container */}
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <button onClick={() => handleEdit(recipe.id)}>Edit</button>
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>
              <button onClick={() => handleImageUpload(recipe.id)}>Upload Image</button>
            </div>
          ))}
        </div>
      ) : (
        !message && <p>Loading recipes...</p>
      )}
    </div>
  );
}

export default RecipesList;
