import React, { useState } from 'react';
import './styles.css';

const NewRecipe = () => {
  const [title, setTitle] = useState('My Awesome Recipe');
  const [minutes, setMinutes] = useState('30');
  const [instructions, setInstructions] = useState(`Here's how you make it.
  
    ## Ingredients
    
    - 1c Sugar
    - 1c Spice
    
    ## Instructions
    
    **Mix** sugar and spice. _Bake_ for 30 minutes.
      `);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data as JSON to Flask API endpoint
    const recipeData = {
      title,
      minutes_to_complete: minutes,
      instructions,
    };

    fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Recipe submitted successfully:', data);
        // Reset form fields
        setTitle('');
        setMinutes('');
        setInstructions('');
      })
      .catch((error) => {
        console.error('Error submitting recipe:', error);
      });
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2>Create Recipe</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <label htmlFor="title" className="label">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="minutes" className="label">Minutes to complete</label>
            <input
              type="text"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="instructions" className="label">Instructions</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="textarea"
            />
          </div>
          <button type="submit" className="button">
            Submit Recipe
          </button>
        </form>
      </div>
      <div className="recipePreview">
        <h2 className="recipeTitle">{title || 'My Awesome Recipe'}</h2>
        <p className="recipeDetails">
          Time to Complete: {minutes || '30'} minutes · By <span className="author">User</span>
        </p>
        
        <h3>Ingredients</h3>
        <ul className="ingredients">
          <li className="listItem">1c Sugar</li>
          <li className="listItem">1c Spice</li>
        </ul>
        <h3>Instructions</h3>
        <p className="instructions">
          <strong>Mix</strong> sugar and spice. <em>Bake</em> for 30 minutes.
        </p>
      </div>
    </div>
  );
};

export default NewRecipe;
