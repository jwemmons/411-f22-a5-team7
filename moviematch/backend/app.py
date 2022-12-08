from flask import Flask, jsonify, request, session, redirect, jsonify
import requests
from flask_cors import CORS
from routes.movie_routes import bp as movie_routes
from db.db import db
from db.user_model import UserModel
import spotipy
from flask_session import Session
import config


app = Flask(__name__)
CORS(
    app, 
    origins=["http://localhost:3000", "http:'//127.0.0.1:3000"], 
    supports_credentials=True
) 

app.register_blueprint(movie_routes)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mmdb.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
db.init_app(app)

app.config['SECRET_KEY'] = "secret_key"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
Session(app)


@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/login')
def login():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-read-email ', cache_handler=cache_handler,
                                               show_dialog=True, client_id=config.CLIENT_ID, client_secret=config.CLIENT_SECRET, redirect_uri=config.REDIRECT_URI)

    if request.args.get('code'):
        print('code is in request.args')
        auth_manager.get_access_token(request.args.get('code'))
        return redirect('/login')

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        print('no valid token, need to sign-in with spotify')
        auth_url = auth_manager.get_authorize_url()
        #return f'<a href="{auth_url}">Sign in with Spotify</a>'
        print("got here")
        return jsonify({"url": auth_url})
        # return redirect(auth_url)
    # else:
    #     print('signed in successfully')
    #     sp = spotipy.Spotify(auth_manager=auth_manager)
    #     me = sp.me()
    #     # if not(UserModel.query.filter_by(user_id=me['id']).first()):
    #     #     user = UserModel(me['id'],me['display_name'],"{}")
    #     #     UserModel.session.add(user)
    #     #     UserModel.session.commit()
    #     return jsonify({'data': 'success'})

@app.route('/callback')
def callback():
    code = request.args.get('code')
    session['code'] = code
    # new_url = '/login?code=' + code
    new_url = "http://localhost:3000/search"
    return redirect(new_url)

@app.route('/logout')
def logout():
    session.pop("token_info", None)
    return jsonify({'url': 'http://localhost:3000/home'})

@app.route('/user/add_fav/<movie_id>')
def add_fav(movie_id):
    # cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    # auth_manager = spotipy.oauth2.SpotifyOAuth(
    #         cache_handler=cache_handler, client_id=config.CLIENT_ID, client_secret=config.CLIENT_SECRET, redirect_uri=config.REDIRECT_URI)
    # if not auth_manager.validate_token(cache_handler.get_cached_token()):
    #         return redirect('/login')
    # sp = spotipy.Spotify(auth_manager=auth_manager)
    # user_id = sp.me()['id']
    # data = UserModel.query.filter_by(user_id=user_id).first()
    pass
    
