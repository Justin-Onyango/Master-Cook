from flask import request, jsonify, session
from flask_jwt_extended import JWTManager, create_access_token
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

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    bio = db.Column(db.String(500))
    image_url = db.Column(db.String(200))

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        
        if user is not None and user.authenticate(password):
            access_token = create_access_token(identity=username)
            session['user_id'] = user.id  
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

class RecipeIndex(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id is None:
            return {'error': 'Unauthorized'}, 401

        user = User.query.filter(User.id == user_id).first()
        if user is None:
            return {'error': 'Unauthorized'}, 401

        recipes = Recipe.query.filter(Recipe.user_id == user_id).all()
        if not recipes:
            return {'error': 'No recipes found'}, 404

        return [recipe.to_dict() for recipe in recipes], 200

    def post(self):
        user_id = session.get('user_id')
        if user_id is None:
            return {'error': 'Unauthorized'}, 401

        request_json = request.get_json()

        title = request_json['title']
        instructions = request_json['instructions']
        minutes_to_complete = request_json['minutes_to_complete']

        try:
            recipe = Recipe(
                title=title,
                instructions=instructions,
                minutes_to_complete=minutes_to_complete,
                user_id=user_id,
            )

            db.session.add(recipe)
            db.session.commit()

            return recipe.to_dict(), 201

        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422

        

api = Api(app)
api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(RecipeIndex, '/recipes')


if __name__ == '__main__':
    app.run(debug=True)

