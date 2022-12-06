import config
import requests

stream_api_key=config.STREAM_API_KEY
tmdb_key=config.TMDB_KEY

def getGenreID(genre):
    r = requests.get(f"https://api.themoviedb.org/3/genre/movie/list?api_key={tmdb_key}")
    json = r.json()

    for i in json["genres"]:
        if i["name"].casefold() == genre.casefold():
            return i["id"] 

    return "Genre not found"

def getProviderID(provider):
    r = requests.get(f"https://api.themoviedb.org/3/watch/providers/movie?api_key={tmdb_key}&watch_region=US")
    r_json = r.json()

    for i in r_json["results"]:
        if provider.casefold() in i["provider_name"].casefold():
            return i["provider_id"]

    return "Provider not found"

def getByGenre(data):
    genre = data["genre"]
    runtime = data["runtime"]
    stream = data["stream"]
    genreID = getGenreID(genre)
    providerID = getProviderID(stream)

    url = "https://api.themoviedb.org/3/discover/movie"
    payload = {
        "api_key": tmdb_key ,
        "language": "en-US",
        "sort_by": "popularity.desc",
        "with_runtime.lte": runtime,
        "vote_average.gte": 7,
        "with_genres": genreID,
        "with_original_language": "en",
        "with_watch_providers": providerID,
        "watch_region": "US"
    }

    r = requests.get(url, params=payload)
    json = r.json()

    response = {"results": []}
    i = 0
    while len(response["results"]) < 15 and i < len(json["results"]):
        movie_id = json["results"][i].get("id")
        key = tmdb_key 
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={key}"

        details = requests.get(url)
        det_json = details.json()

        poster_path = json["results"][i].get("poster_path")
        if poster_path == None:
            i += 1
            continue

        poster_path = "https://image.tmdb.org/t/p/w200" + poster_path

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

def getStreamAvail(movie_id):
    url = f"https://watchmode.p.rapidapi.com/title/movie-{movie_id}/sources/"

    headers = {
        "regions": "US",
        "X-RapidAPI-Key": stream_api_key,
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