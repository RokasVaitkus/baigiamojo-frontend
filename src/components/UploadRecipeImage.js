import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminService from "../services/admin.service";


function UploadRecipeImage() {
  const { recipeId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please select an image to upload.");
      return;
    }

    setLoading(true);

    try {
      const response = await AdminService.uploadImage(selectedFile);

      const imageId = response.data;

      const imageLink = `http://localhost:8080/api/user/findimagebyid/${imageId}`;

      await AdminService.editRecipeImageLink(recipeId, JSON.stringify(imageLink));

      setMessage("Image uploaded and recipe updated successfully!");
      setSelectedFile(null);

      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error uploading image or updating recipe:", error);
      setMessage("Failed to upload image or update recipe. Please try again.");
    } finally {
      setLoading(false); 
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
