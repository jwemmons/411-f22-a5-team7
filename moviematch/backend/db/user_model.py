from .db import db 

class UserModel(db.Model):
    __tablename__ = 'users'

    user_key = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False)
    user_name = db.Column(db.String(50), nullable=False)
    user_fav = db.Column(db.String(1000))

    def __init__(self, user_id, user_name, user_fav):
        self.user_id = user_id
        self.user_name = user_name
        self.user_fav = user_fav


