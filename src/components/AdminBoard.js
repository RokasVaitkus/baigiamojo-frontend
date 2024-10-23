// components/AdminBoard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import RecipesList from "./recipeListScrollable";
import UsersList from "./userlistscrollable";


const AdminBoard = () => {
  const navigate = useNavigate();

  const handleCreateRecipe = () => {
    navigate("/new-recipe"); // Navigate to the NewRecipe component
  };

  const handleCreateUser = () => {
    navigate("/create-user"); // Navigate to the CreateUser component
  };

  return (
    <div className="admin-container">
    <div className="admin-board"> 
      <h1>Admin Board</h1>
      <p>Welcome to the Admin Board! You have admin privileges.</p>
      <button className="btn" onClick={handleCreateRecipe}>
        Create New Recipe
      </button>
      <button className="btn" onClick={handleCreateUser}>
        Create New User
      </button>
      <RecipesList />
      <UsersList />
    </div>
    </div>
  );
};

export default AdminBoard;
