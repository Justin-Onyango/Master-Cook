import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recipes');
        setUser_id(response.data.user_id);
      } catch (error) {
        console.error("There was an error fetching the user_id", error);
      }
    };

fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recipes', {
        title,
        minutes,
        instructions,
        username
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("There was an error submitting the recipe!", error);
    }
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
              rows="10"
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
          Time to Complete: {minutes || '30'} minutes · By <span style={styles.author}>{username}</span>
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
      {message && <p>{message}</p>}
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
    backgroundColor: 'gray white',
    borderRadius: '5px',
  },
  author: {
    fontStyle: 'italic',
  },
};

export default NewRecipe;


