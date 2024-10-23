import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminService from "../services/admin.service"; // Ensure this imports your service correctly
import UserService from "../services/user.service";


const EditRecipe = () => {
  const { recipeId } = useParams(); // Get the recipe ID from the route parameters
  const navigate = useNavigate(); // To navigate back to the admin board after editing

  // State variables to hold recipe data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [portions, setPortions] = useState(1);
  const [howLongItTakesToMake, setHowLongItTakesToMake] = useState(0);
  const [howToMakeIt, setHowToMakeIt] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", weight: 0 }]);

  // Fetch the existing recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await UserService.getRecipeById(recipeId); // Implement this service method
        const recipe = response.data;

        // Set the state variables with the fetched recipe data
        setName(recipe.name);
        setDescription(recipe.description);
        setPortions(recipe.portions);
        setHowLongItTakesToMake(recipe.howLongItTakesToMake);
        setHowToMakeIt(recipe.howToMakeIt);
        setIngredients(recipe.ingredients);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Function to handle adding a new ingredient field
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", weight: 0 }]);
  };

  // Function to handle ingredient input changes
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  // Function to handle ingredient removal
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  // Handle form submission to update the recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      name,
      description,
      portions,
      howLongItTakesToMake,
      howToMakeIt,
      ingredients,
    };

    try {
      await AdminService.editRecipeById(recipeId, updatedRecipe); // Update the recipe using the service
      // Redirect back to the admin board or any other page
      navigate("/admin"); // Change to desired redirect after edit
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="admin-container">
    <form onSubmit={handleSubmit}>
      <div>
        <label>Recipe Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={name || "Recipe name"} // Use the existing name or fallback to a default
          required
        />
      </div>
      <div>
        <label>Recipe Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={description || "Recipe description"} // Use existing description or default
          required
        />
      </div>
      <div>
        <label>Portions:</label>
        <input
          type="number"
          value={portions}
          onChange={(e) => setPortions(Number(e.target.value))}
          placeholder={portions ? portions.toString() : "Portions"} // Set placeholder based on current value
          min="1"
          required
        />
      </div>
      <div>
        <label>Time to Make (minutes):</label>
        <input
          type="number"
          value={howLongItTakesToMake}
          onChange={(e) => setHowLongItTakesToMake(Number(e.target.value))}
          placeholder={howLongItTakesToMake ? howLongItTakesToMake.toString() : "Time to make (in minutes)"} // Set placeholder
          min="1"
          required
        />
      </div>
      <div>
        <label>How to Make:</label>
        <textarea
          value={howToMakeIt}
          onChange={(e) => setHowToMakeIt(e.target.value)}
          placeholder={howToMakeIt || "How to make it"} // Set placeholder based on current value
          required
        />
      </div>

      {/* Ingredients section */}
      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
            placeholder={ingredient.name || "Ingredient name"} // Use existing name or default
            required
          />
          <input
            type="number"
            value={ingredient.weight}
            onChange={(e) => handleIngredientChange(index, "weight", Number(e.target.value))}
            placeholder={ingredient.weight ? ingredient.weight.toString() : "Weight (g or quantity)"} // Set placeholder based on weight
            min="0"
            required
          />
          <button className="btn" type="button" onClick={() => handleRemoveIngredient(index)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      ))}
      <button className="btn" type="button" onClick={addIngredient}>
        Add Ingredient
      </button>

      <button className="btn" type="submit">Update Recipe</button>
    </form>
    </div>
  );
};

export default EditRecipe;
