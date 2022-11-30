from flask import Flask, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   


def getGenreID(genre): 
    r = requests.get("https://api.themoviedb.org/3/genre/movie/list?api_key=af670971ce22ac2581c336c416ca91aa")
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
        "api_key": "af670971ce22ac2581c336c416ca91aa",
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
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=af670971ce22ac2581c336c416ca91aa"

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
    tmdb_id = f"movie/{str(movie_id)}"

    url = "https://streaming-availability.p.rapidapi.com/get/basic"
    
    payload = {
        "country": "us",
        "tmdb_id": tmdb_id,
        "output_language": "en"
    }

    headers = {
        "X-RapidAPI-Key": "<INSERT API KEY>",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
    }

    r = requests.get(url, params=payload, headers=headers)
    if r.status_code != 200:
        return {"error": "streaming info not found"}, r.status_code
    
    json = r.json()

    response = {"results": []}
    for platform in json.get("streamingInfo"):
        response["results"].append(platform)

    return response

app.run(port=4000, debug=True)




