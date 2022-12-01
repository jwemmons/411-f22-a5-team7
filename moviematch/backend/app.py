from flask import Flask, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_pyfile('config.py')   


def getGenreID(genre):
    key = app.config['TMDB_KEY'] 
    r = requests.get(f"https://api.themoviedb.org/3/genre/movie/list?api_key={key}")
    json = r.json()

    for i in json["genres"]:
        if i["name"] == genre:
            return i["id"] 

    return "Genre not found"

@app.route('/movies/get_by_genre', methods=['POST'])
def search():
    data = request.get_json()
    genre = data["genre"]
    genreID = getGenreID(genre)

    url = "https://api.themoviedb.org/3/discover/movie"
    payload = {
        "api_key": app.config['TMDB_KEY'] ,
        "language": "en-US",
        "sort_by": "popularity.desc",
        "with_runtime.lte": 200,
        "vote_average.gte": 7.5,
        "with_genres": genreID,
        "with_original_language": "en"
    }

    r = requests.get(url, params=payload)
    json = r.json()

    response = {"results": []}
    i = 0
    while len(response["results"]) < 15:
        movie_id = json["results"][i].get("id")
        key = app.config['TMDB_KEY'] 
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={key}"

        details = requests.get(url)
        det_json = details.json()

        poster_path = "https://image.tmdb.org/t/p/original" + json["results"][i].get("poster_path")     

        movie = {
            "title": json["results"][i].get("original_title"),
            "release_date": json["results"][i].get("release_date"),
            "runtime": det_json["runtime"],
            "rating": json["results"][i].get("vote_average"),
            "poster_path": poster_path,
            "id": json["results"][i].get("id")
        }

        response["results"].append(movie)
        i += 1
    return response

@app.route('/<movie_id>/availability')
def getStreamAvail(movie_id):
    url = f"https://watchmode.p.rapidapi.com/title/movie-{movie_id}/sources/"

    headers = {
        "regions": "US",
        "X-RapidAPI-Key": app.config['STREAM_API_KEY'],
        "X-RapidAPI-Host": "watchmode.p.rapidapi.com"
    }

    r = requests.get(url, headers=headers)
    json = r.json()

    if type(json) is dict:
        return {"error": "invalid movie id"}, json["statusCode"]

    response = {"results": []}
    for i in range(len(json)):
        platform = {
            "name": json[i]["name"], 
            "link": json[i]["web_url"]
        }
        if platform not in response["results"]:
            response["results"].append(platform)

    return response

app.run(port=4000, debug=True)




