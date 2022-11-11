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

        movie = {
            "title": json["results"][i].get("original_title"),
            "release_date": json["results"][i].get("release_date"),
            "runtime": det_json["runtime"],
            "rating": json["results"][i].get("vote_average"),
            "poster_path": json["results"][i].get("poster_path")
        }

        response["results"].append(movie)
        i += 1
    return response


app.run(port=4000, debug=True)




