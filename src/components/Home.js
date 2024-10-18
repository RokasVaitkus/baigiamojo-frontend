import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import AllRecipeList from "../AllRecipeList";
import RecipeService from "../services/recipe.service";

const Home = () => {
  const [content, setContent] = useState("Welcome to the homepage!");
  const [error, setError] = useState(null);    // State to handle any potential errors
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    RecipeService.getAllRecipes()
      .then(
        (response) => {
          setRecipes(response.data);  // Assuming response.data contains the recipes array
        },
        (error) => {
          console.error("Failed to fetch recipes", error);
          setError(error.message || "An error occurred while fetching recipes");
        }
      );
  }, []); 


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setContent(`Welcome back, ${user.username}!`);
    }
  }, []);

  return (
    <div className="outer-container">

      <h1 className="title">RECEPTU SKRYNIA</h1>
    <div className="content-container">
      <div className="grid">
        <AllRecipeList recipes={recipes}/>
      </div>
     </div>
    </div>
  );
}

export default Home;
