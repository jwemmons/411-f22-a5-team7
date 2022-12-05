from flask import Flask, request
import requests
from flask_cors import CORS
from routes.movie_routes import bp as movie_routes

app = Flask(__name__)
CORS(app) 
app.register_blueprint(movie_routes)







