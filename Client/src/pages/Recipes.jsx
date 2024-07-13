	
11:35 AM







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.divbackground-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;;

const Title = styled.h2font-size: 24px;
  margin-bottom: 20px;
  text-align: center;;

const List = styled.divdisplay: flex;
  flex-direction: column;
  gap: 20px;;

const Card = styled.divpadding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);;

const CardTitle = styled.h3font-size: 20px;
  margin-bottom: 10px;;

const Author = styled.pcolor: gray;
  margin-bottom: 10px;;

const Minutes = styled.pmargin-bottom: 10px;;

const Instructions = styled.pfont-style: italic;
  margin-bottom: 10px;;

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error("There was an error fetching the recipes!", error);
      }
    };

fetchRecipes();
  }, []);

  return (
    <Container>
      <Title>Recipes</Title>
      <List>
        {recipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardTitle>{recipe.title}</CardTitle>
            <Author>By {recipe.author}</Author>
            <Minutes>Time to Complete: {recipe.minutes} minutes</Minutes>
            <Instructions>{recipe.instructions}</Instructions>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default Recipes;