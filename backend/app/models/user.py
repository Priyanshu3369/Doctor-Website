from app.extensions import mongo

def find_user_by_email(email):
    return mongo.db.users.find_one({"email": email})

def insert_user(user_data):
    mongo.db.users.insert_one(user_data)
