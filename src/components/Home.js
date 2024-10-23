import React, { useState, useEffect } from "react";
import LoginService from "../services/login.service";
import AllRecipeList from "./AllRecipeList";
import UserService from "../services/user.service";
import RecipeSlideshow from "./RecipeSlideShow";


const Home = () => {
  const [content, setContent] = useState("Welcome to the homepage!");
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    UserService.getAllRecipes()
      .then(
        (response) => {
          setRecipes(response.data);
        },
        (error) => {
          console.error("Failed to fetch recipes", error);
          setError(error.message || "An error occurred while fetching recipes");
        }
      );
  }, []); 


  useEffect(() => {
    const user = LoginService.getCurrentUser();
    if (user) {
      setContent(`Welcome back, ${user.username}!`);
    }
  }, []);

  return (
    <div className="outer-container">

      <h1 className="title">The Recipe Book</h1>
    <div className="content-container">
      <RecipeSlideshow />
      <div className="grid">
        <AllRecipeList recipes={recipes}/>
      </div>
     </div>
    </div>
  );
}

export default Home;
