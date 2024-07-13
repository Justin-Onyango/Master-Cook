# Master-Cook

Master Cook is a project dedicated to providing a delightful cooking and recipe finding experience to all the passionate cooks. Once you find a recipe, it seamlessly directs you to YouTube for step-by-step cooking tutorials. After watching the tutorial, the user can come back to the application to add new recipes (to the back end) and add Popular recipes to the favourites section.

## These are the features

• User Authentication: Allow users to sign up, log in.

• Recipe Management: Enable users to view a list of recipes, view details of    individual recipes, and add their favorite recipes from popular page also create  new recipe and view popular recipes from fetched public API that links to the youtube so that they can watch step by step tutorial how make the recipe.

• Navigation: Provide an intuitive navigation system to access different sections of the app.

### How to run it.

1. First clone this repository to your local machine.

2. Then open the folder with your preferred code editor.

3. Once you have done follow these commands.

## Instructions

To set up the frontend and backend dependencies, from the root directory, run:

```console
$ npm install --prefix client
$ pipenv install
$ pipenv shell
```

In `server/`, run:

```console
$ flask db upgrade
$ python seed.py
```
To see how the React application and Flask API are interacting, you can run the
Flask application in one terminal by running:

```console
$ python app.py
```

Then, **open another terminal** and run React:

```console
$ npm start --prefix client
```

Each application will run on its own port on `localhost`:

e.g.
- React: [http://localhost:4000](http://localhost:4000)
- Flask: [http://localhost:5555](http://localhost:5555)
