import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/recipe/";

const getAllRecipes = () => {
    return axios.get(API_URL + "allRecipes");
  };

const getRecipeById = (id) => {
    return axios.get(API_URL + "recipeById/"+ id, {headers: authHeader()});
};

const createRecipe = (recipe) => {
    return axios
      .post(API_URL + "create", {
        name: recipe.name,
        description: recipe.description,
        portions: recipe.portions,
        howLongItTakesToMake: recipe.howLongItTakesToMake,
        ingredients: recipe.ingredients,  
        howToMakeIt: recipe.howToMakeIt
      })
      .then((response) => {
        console.log("Recipe Created: ", response);
  
        return response.data;
      })
      .catch((error) => {
        console.error("Error creating recipe: ", error);
      });
  };

  const deleteRecipeById = (id) => {
    return axios.delete(API_URL + "deleteById/"+ id, {headers: authHeader()});
};

const editRecipeById = (id) => {
    return axios.patch(API_URL + "editById/"+ id, {headers: authHeader()});
};
  
const RecipeService = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipeById,
    editRecipeById,
  };

  export default RecipeService;