import React, { useEffect, useReducer } from 'react';
import UserService from '../services/user.service'; // Adjust the path if needed

// Initial state and reducer function
const initialState = {
  recipes: [],
  currentIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return { ...state, recipes: action.payload };
    case 'NEXT_SLIDE':
      return { ...state, currentIndex: (state.currentIndex + 1) % state.recipes.length };
    case 'PREV_SLIDE':
      return { ...state, currentIndex: (state.currentIndex - 1 + state.recipes.length) % state.recipes.length };
    case 'SET_CURRENT_INDEX':
      return { ...state, currentIndex: action.payload };
    default:
      return state;
  }
};

const RecipeSlideshow = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await UserService.getAllRecipes();
        console.log('Fetched recipes:', response.data);
        const allRecipes = response.data;

        // Shuffle and select 8 random recipes
        const shuffledRecipes = allRecipes.sort(() => 0.5 - Math.random());
        const randomRecipes = shuffledRecipes.slice(0, 8);
        console.log('Random recipes selected:', randomRecipes);
        dispatch({ type: 'SET_RECIPES', payload: randomRecipes });
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRandomRecipes();
  }, []); // Run only on mount

  // Automatic scrolling every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'NEXT_SLIDE' });
    }, 3000);

    return () => clearInterval(interval);
  }, [state.recipes.length]); // Update the interval based on recipes length

  if (state.recipes.length === 0) return <p>Loading recipes...</p>;

  return (
    <div className="recipe-slideshow">
      <h2>Featured Recipes</h2>
      <div className="slideshow-container" style={{ transform: `translateX(-${state.currentIndex * 100}%)` }}>
        {state.recipes.map((recipe) => (
          <div className="slide" key={recipe.id} style={{ backgroundColor: '#fff' }}>
            <RecipeCard
              name={recipe.name}
              time={recipe.howLongItTakesToMake}
              portion={recipe.portions}
              linkToImage={recipe.linkToImage}
              recipeId={recipe.id}
            />
          </div>
        ))}
      </div>
      <div className="slideshow-indicators">
        {state.recipes.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === state.currentIndex ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_CURRENT_INDEX', payload: index })}
          />
        ))}
      </div>
      {/* Navigation arrows */}
      <button className="arrow left-arrow" onClick={() => dispatch({ type: 'PREV_SLIDE' })}>&lt;</button>
      <button className="arrow right-arrow" onClick={() => dispatch({ type: 'NEXT_SLIDE' })}>&gt;</button>
    </div>
  );
};

// RecipeCard component
const RecipeCard = ({ name, time, portion, linkToImage, recipeId }) => {
  const [imageSrc, setImageSrc] = React.useState(""); // Using React.useState here for the image source

  useEffect(() => {
    if (linkToImage) {
      UserService.getImageForRecipe(linkToImage)
        .then((response) => {
          setImageSrc(`data:image/png;base64,${response.data}`);
        })
        .catch((error) => console.error("Error fetching image:", error));
    } else {
      setImageSrc("path/to/default/image.png"); // Set a default image if linkToImage is null
    }
  }, [linkToImage]);

  const handleCardClick = () => {
    window.location.href = `/recipe/${recipeId}`;
  };

  return (
    <button className="recipe-card" onClick={handleCardClick}>
      <img src={imageSrc} alt={name} className="recipe-image" /> {/* Using name for the alt attribute */}
      <div className="content">
        <p><strong>Pavadinimas:</strong> {name}</p>
        <p><strong>Time to make:</strong> {time} minutes</p>
        <p><strong>Portion size:</strong> {portion}</p>
      </div>
    </button>
  );
};

export default RecipeSlideshow;
