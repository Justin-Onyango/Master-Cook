from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_cors import CORS
from flask_restful import Resource, Api
from sqlalchemy.exc import IntegrityError
from config import app, db, bcrypt
from models import User, Recipe
from datetime import timedelta
from flask_migrate import Migrate

CORS(app)
app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["SECRET_KEY"] = "JKSRVHJVFBSR"

jwt = JWTManager(app)
migrate = Migrate(app, db)

class Login(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token)
        return jsonify({"msg": "Bad username or password"}), 401

class Register(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email')
        bio = request.json.get('bio')
        image_url = request.json.get('image_url')
        user = User(username=username, email=email, bio=bio, image_url=image_url)
        user.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "User created successfully"})

class RecipeList(Resource):
    @jwt_required
    def get(self):
        recipes = Recipe.query.all()
        return jsonify([recipe.serialize() for recipe in recipes])
    
    @jwt_required
    def post(self):
        title = request.json.get('title')
        instructions = request.json.get('instructions')
        minutes_to_complete = request.json.get('minutes_to_complete')
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        recipe = Recipe(title=title, instructions=instructions, minutes_to_complete=minutes_to_complete, user=user)
        db.session.add(recipe)
        db.session.commit()
        return jsonify({"msg": "Recipe created successfully"})

class RecipeDetail(Resource):
    @jwt_required
    def get(self, id):
        recipe = Recipe.query.get(id)
        if recipe:
            data = recipe.serialize()  
            return jsonify(data)  
        return jsonify({"msg": "Recipe not found"}), 404
    
    @jwt_required
    def put(self, id):
        recipe = Recipe.query.get(id)
        if recipe:
            title = request.json.get('title')
            instructions = request.json.get('instructions')
            minutes_to_complete = request.json.get('minutes_to_complete')
            recipe.title = title
            recipe.instructions = instructions
            recipe.minutes_to_complete = minutes_to_complete
            db.session.commit()
            return jsonify({"msg": "Recipe updated successfully"})
        return jsonify({"msg": "Recipe not found"}), 404

    @jwt_required
    def delete(self, id):
        recipe = Recipe.query.get(id)
        if recipe:
            db.session.delete(recipe)
            db.session.commit()
            return jsonify({"msg": "Recipe deleted successfully"})
        return jsonify({"msg": "Recipe not found"}), 404

api = Api(app)
api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(RecipeList, '/recipes')
api.add_resource(RecipeDetail, '/recipes/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)