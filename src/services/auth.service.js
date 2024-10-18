import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  };

  const login = (username, password) => {
    return axios
            .post(API_URL + "signin", {
              username,
              password,
            })
      .then((response) => {
        console.log("We got Response: ", response );
        if (response.data.accessToken) {
         
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  const getAllUsers = () => {
    return axios.get(API_URL + "allusers", { headers: authHeader() });
  };

  const getUserById = (id) => {
    return axios.get(API_URL + "findById/" + id, { headers: authHeader() });
  };

  const editUserById =(id) =>{
    return axios.patch(API_URL + "editById/" + id, {headers: authHeader()});
  };

  const deleteUserById =(id) =>{
    return axios.delete(API_URL+ "deleteById/" + id , {headers: authHeader()});
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const AuthService = {
    register,
    login,
    getAllUsers,
    getUserById,
    editUserById,
    deleteUserById,
    logout,
    getCurrentUser,
  };

  export default AuthService;