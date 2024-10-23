import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom"; 
import SingleRecipe from "./SingleRecipe";



const RecipeCard = ({ name, time, portion, linkToImage, onClick, recipeId}) => {
  const[imageSrc, setImageSrc] = useState("");
  const navigate = useNavigate();
  const handleCardClick = () => {
    // Navigate to the single recipe page, passing the recipeId
    navigate(`/recipe/${recipeId}`);
  };
  useEffect(() => {
    // Fetch the Base64 image using the full URL
    UserService.getImageForRecipe(linkToImage)
      .then((response) => {
        setImageSrc(`data:image/png;base64,${response.data}`);  // Set the Base64 image
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, [linkToImage]);

  return (
    <button className="recipe-card" onClick={handleCardClick}>
      <img src={imageSrc} alt={`Image of ${name}`} className="recipe-image" />
      <div className="content">  
        <p><strong>Pavadinimas:</strong> {name}</p>
        <p><strong>Time to make:</strong> {time}</p>
        <p><strong>Portion size:</strong> {portion}</p>
      </div> 
    </button>
  );
};

function AllRecipeList({ recipes }) {
  return (
    <>
      {recipes.map((recipe, index) => (
        <RecipeCard 
          key={index}  // Use a unique key for each recipe
          name={recipe.name} 
          time={recipe.howLongItTakesToMake} 
          portion={recipe.portions}
          linkToImage={recipe.linkToImage}  // Pass the image link
          recipeId={recipe.id}
          onClick={() => console.log(`Clicked on ${recipe.name}`)} // Example click handler
        />
      ))}
    </>
  );
}

export default AllRecipeList;
