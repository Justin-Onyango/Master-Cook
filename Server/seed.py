#seed.py
from faker import Faker
from random import randint, choice as rc
from config import app, db, bcrypt
from models import User, Recipe

fake = Faker()

def seed_data():
    with app.app_context():
        print("Deleting all records...")
        db.session.query(Recipe).delete()
        db.session.query(User).delete()

        print("Creating users...")
        users = []
        names = []

        for i in range(20):
            name = fake.first_name()
            while name in names:
                name = fake.first_name()
            names.append(name)

            email = fake.email()

            user = User(
                name=name,
                email=email,
                bio=fake.paragraph(nb_sentences=3),
                image_url=fake.url(),
            )

            password = "newpass"
            user.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

            db.session.add(user)
            db.session.commit()

            users.append(user)

            print("Creating recipes...")
            recipes =[]
            for j in range(5):
                instructions = fake.paragraph(nb_sentences=8)
                
                
        recipe = Recipe(
            title=fake.sentence(),
            instructions=instructions,
            minutes_to_complete=randint(15,90),
        )

        recipe.user = rc(users)

        recipes.append(recipe)

    db.session.add_all(recipes)
    
    db.session.commit()
    print("Complete.")