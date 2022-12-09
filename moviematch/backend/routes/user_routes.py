from flask import (Blueprint, request, jsonify)
from db.db import db
from db.user_model import UserModel
import json


bp = Blueprint('user', __name__)

@bp.route('/user/add_fav', methods=['POST'])
def add_fav():
    data = request.get_json()
    user = UserModel.query.filter_by(user_id=0).first()
    print(user.user_fav)
    favs = json.loads(user.user_fav)
    if favs == {}:
        favs['fav'] = [data]
    else:
        favs['fav'] += [data]
    user.user_fav = json.dumps(favs)
    db.session.commit()
    return {"data": "success"}

@bp.route('/user/get_fav')
def get_fav():
    user = UserModel.query.filter_by(user_id=0).first()
    favs = user.user_fav
    return jsonify(favs)

# @bp.route('/user/delete_fav/<movie_id>')
# def delete_fav(movie_id):
#     user = UserModel.query.filter_by(user_id=0).first()
#     favs = json.loads(user.user_fav)
    
