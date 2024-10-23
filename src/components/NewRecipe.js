import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../services/admin.service";

function NewRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [portions, setPortions] = useState(1);
  const [howLongItTakesToMake, setHowLongItTakesToMake] = useState(0);
  const [howToMakeIt, setHowToMakeIt] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", weight: 0 }]);

  const navigate = useNavigate();

  
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", weight: 0 }]);
  };


  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      name,
      description,
      portions,
      howLongItTakesToMake,
      howToMakeIt,
      ingredients,
    };

    try {
      const response = await AdminService.createRecipe(newRecipe);
      const recipeId = response.id;

      navigate(`/upload-image/${recipeId}`);
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label>Recipe Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Recipe name"
            required
          />
        </div>
        <div className="form-group">
          <label>Recipe Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe description"
            required
          />
        </div>
        <div className="form-group">
          <label>Portions:</label>
          <input
            type="number"
            value={portions}
            onChange={(e) => setPortions(Number(e.target.value))}
            placeholder="Portions"
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Time to Make (minutes):</label>
          <input
            type="number"
            value={howLongItTakesToMake}
            onChange={(e) => setHowLongItTakesToMake(Number(e.target.value))}
            placeholder="Time to make (in minutes)"
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>How to Make:</label>
          <textarea
            value={howToMakeIt}
            onChange={(e) => setHowToMakeIt(e.target.value)}
            placeholder="How to make it"
            required
          />
        </div>


        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-group">
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              placeholder="Ingredient name"
              required
            />
            <input
              type="number"
              value={ingredient.weight}
              onChange={(e) => handleIngredientChange(index, "weight", Number(e.target.value))}
              placeholder="Weight (g or quantity)"
              min="0"
              required
            />
          </div>
        ))}
        <button className="btn" type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <button className="btn" type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default NewRecipe;
