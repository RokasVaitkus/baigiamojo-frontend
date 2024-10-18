import React from "react";
import RecipeService from "./services/recipe.service";

const recipes= RecipeService.getAllRecipes();

const RecipeCard = ({ name, time, portion }) => {
  return (
    <div className="recipe-card">
      <div className="content">
        <p><strong>Pavadinimas:</strong> {name}</p>
        <p><strong>Time to make:</strong> {time}</p>
        <p><strong>Portion size:</strong> {portion}</p>
      </div>
    </div>
  );
};

function AllRecipeList({ recipes }) {
  return (
    <>
      {recipes.map((recipe, index) => (
        <RecipeCard 
          
          name={recipe.name} 
          time={recipe.howLongItTakesToMake} 
          portion={recipe.portions}
        />
      ))}
    </>
  );
}

export default AllRecipeList;
