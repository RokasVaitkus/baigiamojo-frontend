import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LoginService from "./services/login.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NewRecipe from "./components/NewRecipe";
import SingleRecipe from "./components/SingleRecipe";
import AdminBoard from "./components/AdminBoard"; // Import AdminBoard component
import UploadRecipeImage from "./components/UploadRecipeImage";
import EditRecipe from "./components/EditRecipe";
import CreateUser from "./components/CreateUser";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = LoginService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    LoginService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {currentUser && (
          <>
            <Link to={"/home"} className="navbar-brand">
            The Recipe Book
            </Link>

            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {/* Admin link visible only to ROLE_ADMIN */}
              {currentUser.roles && currentUser.roles.includes("ROLE_ADMIN") && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
            </div>
          </>
        )}

        {currentUser ? (
          <div className="navbar-nav ms-auto"> {/* Right-aligned Profile and Logout */}
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          {currentUser ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recipe/:recipeId" element={<SingleRecipe />} />
              <Route path="/new-recipe" element={<NewRecipe />} />
              <Route path="/admin" element={<AdminBoard />} />
              <Route path="/upload-recipe-image/:recipeId" element={<UploadRecipeImage />} />
              <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
              <Route path="/create-user" element={<CreateUser />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
