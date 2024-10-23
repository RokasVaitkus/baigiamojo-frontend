import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";
//USER ENDPOINTS
const getAllUsers = () => {
    return axios.get(API_URL + "allusers", { headers: authHeader() });
  };


  const deleteUserById =(id) =>{
    return axios.delete(API_URL+ "deleteuserbyid/" + id , {headers: authHeader()});
  };
  const getUserById = (id) => {
    return axios.get(API_URL + "finduserbyid/" + id, { headers: authHeader() });
  };
//RECIPE ENDPOINTS 
const createRecipe = (recipe) => {
    return axios
      .post(API_URL + "createrecipe", {
        name: recipe.name,
        description: recipe.description,
        portions: recipe.portions,
        howLongItTakesToMake: recipe.howLongItTakesToMake,
        ingredients: recipe.ingredients,  
        howToMakeIt: recipe.howToMakeIt
      }, {headers: authHeader()})
      .then((response) => {
        console.log("Recipe Created: ", response);
  
        return response.data;
      })
      .catch((error) => {
        console.error("Error creating recipe: ", error);
      });
  };

  const deleteRecipeById = (id) => {
    return axios.delete(API_URL + "deleterecipebyid/"+ id, {headers: authHeader()});
};

const editRecipeById = (id,recipeUpdates) => {
    return axios.patch(API_URL + "editrecipebyid/"+ id,recipeUpdates, {headers: authHeader()});
};

const editRecipeImageLink = (id, link) => {
  return axios.patch(API_URL + "updaterecipeimagelink/" + id, link, {
      headers: {
          ...authHeader(), // Keep existing auth headers
          'Content-Type': 'text/plain' // Specify that the content is plain text
      }
  });
}
//IMAGE ENDPOINTS

const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(API_URL + "createimage", formData, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    });
};
  const deleteImageById = (id) => {
    return axios.delete(API_URL + "deleteimagebyid/" + id, { headers: authHeader() });
};

const editImageById = (id, recipeImage) => {
    return axios.patch(API_URL + "editimagebyid/" + id, recipeImage, { headers: authHeader() });
};

const AdminService = {
    getAllUsers,
    deleteUserById,
    getUserById,
    createRecipe,
    deleteRecipeById,
    editRecipeById,
    editRecipeImageLink,
    uploadImage,
    deleteImageById,
    editImageById
  };

  export default AdminService;