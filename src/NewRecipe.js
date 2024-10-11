import React, { useState } from "react";

function NewRecipe({ addRecipe }) {
  // State for the recipe fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [portions, setPortions] = useState(1);
  const [howLongItTakesToMake, setHowLongItTakesToMake] = useState(0);
  const [howToMakeIt, setHowToMakeIt] = useState("");

  // State for ingredients
  const [ingredients, setIngredients] = useState([
    { name: "", weight: 0 },
  ]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", weight: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      name,
      description,
      portions,
      howLongItTakesToMake,
      howToMakeIt,
      ingredients,
    };
    addRecipe(newRecipe);
    // Clear the form
    setName("");
    setDescription("");
    setPortions(1);
    setHowLongItTakesToMake(0);
    setHowToMakeIt("");
    setIngredients([{ name: "", weight: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Recipe name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe description"
      />
      <input
        type="number"
        value={portions}
        onChange={(e) => setPortions(Number(e.target.value))}
        placeholder="Portions"
      />
      <input
        type="number"
        value={howLongItTakesToMake}
        onChange={(e) => setHowLongItTakesToMake(Number(e.target.value))}
        placeholder="Time to make (in minutes)"
      />
      <textarea
        value={howToMakeIt}
        onChange={(e) => setHowToMakeIt(e.target.value)}
        placeholder="How to make it"
      />

      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
            placeholder="Ingredient name"
          />
          <input
            type="number"
            value={ingredient.weight}
            onChange={(e) => handleIngredientChange(index, "weight", Number(e.target.value))}
            placeholder="Weight (g or quantity)"
          />
        </div>
      ))}
      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>
      
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default NewRecipe;
