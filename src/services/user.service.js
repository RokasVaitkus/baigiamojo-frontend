import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";
// USER ENDPOINTS
const editUserById = (id, userDto) => {
  return axios.patch(API_URL + "edituserbyid/" + id, userDto, {headers: authHeader()});
};
// RECIPE ENDPOINTS
const getAllRecipes = () => {
    return axios.get(API_URL + "allrecipes", { headers: authHeader() });
  };

const getRecipeById = (id) => {
    return axios.get(API_URL + "findrecipebyid/"+ id, { headers: authHeader() });
};

//IMAGE ENDPOINTS


const getImageByID = (id) =>{
  return axios.get(API_URL + "findimagebyid/"+ id, { headers: authHeader() });
}
const getImageForRecipe = (url) =>{
  return axios.get(url, { headers: authHeader() });
}

  const UserService = {
    getAllRecipes,
    editUserById,
    getRecipeById,
    getImageByID,
    getImageForRecipe
    
};

  export default UserService;