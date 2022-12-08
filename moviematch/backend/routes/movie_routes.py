from flask import (Blueprint, request)
from services.movie_services import *

bp = Blueprint('movie', __name__)

@bp.route('/movies/get_by_genre', methods=['POST'])
def search():
    data = request.get_json()
    response = getByGenre(data)
    return response

@bp.route('/<movie_id>/availability')
def availability(movie_id):
    response = getStreamAvail(movie_id)
    return response

@bp.route('/stream-redirect', methods=['POST'])
def streamLink():
    data = request.get_json()
    response = streamRedirect(data)
    return response