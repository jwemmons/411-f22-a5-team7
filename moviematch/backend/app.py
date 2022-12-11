from flask import Flask, jsonify, request, session, redirect, jsonify
import requests
from flask_cors import CORS, cross_origin
from routes.movie_routes import bp as movie_routes
from routes.user_routes import bp as user_routes
from db.db import db
from db.user_model import UserModel
import spotipy
from flask_session import Session
import config
import os


app = Flask(__name__)
CORS(
    app, 
    origins=["http://localhost:3000", "http:'//127.0.0.1:3000"], 
    supports_credentials=True
) 

app.register_blueprint(movie_routes)
app.register_blueprint(user_routes)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mmdb.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
db.init_app(app)

app.config['SECRET_KEY'] = os.urandom(16)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'

Session(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/login')
@cross_origin(supports_credentials=True)
def login():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-read-email ', cache_handler=cache_handler,
                                               show_dialog=True, client_id=config.CLIENT_ID, client_secret=config.CLIENT_SECRET, redirect_uri=config.REDIRECT_URI)
                                               
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        print('no valid token, need to sign-in with spotify')
        auth_url = auth_manager.get_authorize_url()
        return jsonify({"url": auth_url})
    else:
        return redirect("http://localhost:3000/search")

@app.route('/callback')
@cross_origin(supports_credentials=True)
def callback():
    code = request.args.get('code')
    session['code'] = code
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-read-email ', cache_handler=cache_handler,\
                                               show_dialog=True, client_id=config.CLIENT_ID, client_secret=config.CLIENT_SECRET, redirect_uri=config.REDIRECT_URI)
    auth_manager.get_access_token(code)

    sp = spotipy.Spotify(auth_manager=auth_manager)
    me = sp.me()
    user = UserModel(0, "Dhruv", "{}")
    db.session.add(user)
    db.session.commit()
    url = "http://localhost:3000/search"
    print(session)
    return redirect(url)

@app.route('/logout')
@cross_origin(supports_credentials=True)
def logout():
    session.pop("token_info", None)
    user = UserModel.query.filter_by(user_id=0).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({'url': 'http://localhost:3000/home'})

@app.route('/test>')
@cross_origin(supports_credentials=True)
def add_fav(movie_id):
    print("here")
    print(session)
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(
            cache_handler=cache_handler, client_id=config.CLIENT_ID, client_secret=config.CLIENT_SECRET, redirect_uri=config.REDIRECT_URI)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
            return redirect('/login')
    sp = spotipy.Spotify(auth_manager=auth_manager)
    user_id = sp.me()['display_name']
    data = UserModel.query.filter_by(user_id=user_id).first()
    return {"data": user_id}
    
