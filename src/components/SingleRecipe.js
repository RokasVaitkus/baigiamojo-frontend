import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";  // Import useParams to access URL parameters


const SingleRecipe = () => {
  const { recipeId } = useParams();  // Get the recipeId from the URL
  const [recipe, setRecipe] = useState(null);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Fetch recipe details by ID
    UserService.getRecipeById(recipeId)
      .then((response) => {
        setRecipe(response.data);

        // Fetch the image once the recipe is fetched
        if (response.data.linkToImage) {
          return UserService.getImageForRecipe(response.data.linkToImage);
        }
      })
      .then((imageResponse) => {
        if (imageResponse) {
          setImageSrc(`data:image/png;base64,${imageResponse.data}`);
        }
      })
      .catch((error) => console.error("Error fetching recipe or image:", error));
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
  
    <div className="single-recipe-card">
      <img src={imageSrc} alt={`${recipe.name}`} className="recipe-image" />
      <div className="content">
        <h2>{recipe.name}</h2>
        <p><strong>Description:</strong> {recipe.description}</p>
        <p><strong>Portion size:</strong> {recipe.portions}</p>
        <p><strong>Time to make:</strong> {recipe.howLongItTakesToMake} minutes</p>
        <p><strong>How to Make It:</strong> {recipe.howToMakeIt}</p>
        <div>
          <strong>Ingredients:</strong>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name} - {ingredient.weight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default SingleRecipe;
