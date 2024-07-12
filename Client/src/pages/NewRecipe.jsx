import React, { useState } from 'react';

const NewRecipe = () => {
  const [title, setTitle] = useState('My Awesome Recipe');
  const [minutes, setMinutes] = useState('30');
  const [instructions, setInstructions] = useState(`Here's how you make it.
  
    ## Ingredients
    
    - 1c Rie
    - 1c Spice
    
    ## Instructions
    
    **Mix** Rice and spice. _Bake_ for 30 minutes.
      `);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log({ title, minutes, instructions });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Create Recipe</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="minutes">Minutes to complete</label>
            <input
              type="text"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.button}>
            Submit Recipe
          </button>
        </form>
      </div>
      <div style={styles.recipePreview}>
        <h2>{title || 'My Awesome Recipe'}</h2>
        <p>
          Time to Complete: {minutes || '30'} minutes · By <span style={styles.author}>User</span>
        </p>
        <h3>Ingredients</h3>
        <ul>
          <li>1c Sugar</li>
          <li>1c Spice</li>
        </ul>
        <h3>Instructions</h3>
        <p>
          <strong>Mix</strong> sugar and spice. <em>Bake</em> for 30 minutes.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    width: '45%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    height: '100px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  recipePreview: {
    width: '45%',
    padding: '20px',
    backgroundColor: 'light grey',
    borderRadius: '5px',
  },
  author: {
    fontStyle: 'italic',
  },
};

export default NewRecipe;
