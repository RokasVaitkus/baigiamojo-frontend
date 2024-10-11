import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import AllRecipeList from './AllRecipeList';
import NewRecipe from './NewRecipe';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() =>{
    fetch("http://localhost:8080/recipes")
    .then((response) =>{
      console.log(response);
      return response.json();
    }
  )
    .then((data)=>setRecipes(data) );
  } , []);

  const addRecipe=(recipe)=>{
    fetch("http://localhost:8080/create",{
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify( recipe)
    } )
    .then((response) =>response.json())
    .then((newRecipe)=>setRecipes([...recipes, newRecipe]));
    
  };

  return (
    <div className="outer-container">
      
      <h1 className="title">RECEPTU SKRYNIA</h1>
    <div className="content-container">
      <div className="grid">
        <AllRecipeList recipes={recipes}/>
      </div>
     </div>
    </div>
  );
}

export default App;
