import React, { useState } from "react";
import LoginService from "../services/login.service";
import UserService from "../services/user.service";

const Profile = () => {
  const currentUser = LoginService.getCurrentUser();


  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  const toggleEditMode = () => {
    setEditMode(!editMode);
    setError(null);
    setSuccessMessage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    const userDto = {
      username: formData.username,
      email: formData.email,
    };


    UserService.editUserById(currentUser.id, userDto)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        setSuccessMessage("User information updated successfully!");
        setEditMode(false);

      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setError("Failed to update user. Please try again.");
      });
  };

  return (
    <div className="admin-container">
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {!editMode ? (
        <>
          <p>
            <strong>You are our number:</strong> {currentUser.id} user
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <button className="btn btn-primary" onClick={toggleEditMode}>
            Edit Info
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username"><strong>Username:</strong></label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email"><strong>Email:</strong></label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggleEditMode}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default Profile;
