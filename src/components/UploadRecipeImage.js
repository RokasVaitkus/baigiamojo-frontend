import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminService from "../services/admin.service";


function UploadRecipeImage() {
  const { recipeId } = useParams(); // Get recipeId from route parameters
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router hook to navigate to different pages

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      setMessage(""); // Clear any previous message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please select an image to upload.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Upload the image and retrieve the image ID from the response
      const response = await AdminService.uploadImage(selectedFile);

      // Extract the image ID from the response directly
      const imageId = response.data;

      // Construct the image link using the image ID
      const imageLink = `http://localhost:8080/api/user/findimagebyid/${imageId}`;

      // Update the recipe with this image link
      await AdminService.editRecipeImageLink(recipeId, JSON.stringify(imageLink));

      setMessage("Image uploaded and recipe updated successfully!");
      setSelectedFile(null); // Clear the selected file after success

      // Redirect to the AdminBoard after successful upload
      setTimeout(() => {
        navigate("/admin"); // Redirect to AdminBoard
      }, 2000); // 2-second delay for user to see success message
    } catch (error) {
      console.error("Error uploading image or updating recipe:", error);
      setMessage("Failed to upload image or update recipe. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="admin-container">
    <div className="upload-recipe-image">
      <h2>Upload an Image for Your Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
      {message && <p className={loading ? "loading-message" : ""}>{message}</p>}
    </div>
    </div>
  );
}

export default UploadRecipeImage;
