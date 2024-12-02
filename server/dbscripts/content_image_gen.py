import requests

TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmY3OGQyOTc3YmJjNTNmNTgwOTAzZTUwZDA3ZGNmZCIsIm5iZiI6MTczMTkwMjIwNS43NDYyNzUyLCJzdWIiOiI2NzNhYjdhMmY3NDFlYjA0MjhiNjFlZjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9TjfhZHAlxp78vouilCBm9Y-tIotEMKxwD7pniu3n-A"
OMDB_API_KEY = "5c012a7f"
DATABASE_ENDPOINT = "http://127.0.0.1:8000/content"
CONTENT_PHOTO_ENDPOINT = "http://127.0.0.1:8000/assetinfo/content_picture_api"


def fetch_top_rated_ids(endpoint, total_count):
    """Fetch top-rated movie or TV show IDs."""
    ids = []
    page = 1
    while len(ids) < total_count:
        response = requests.get(endpoint, headers={
            "Authorization": f"Bearer {TMDB_API_KEY}"
        }, params={"page": page})
        if response.status_code != 200:
            raise Exception(
                f"Failed to fetch top-rated: {response.status_code} - {response.text}")

        results = response.json().get("results", [])
        ids.extend([item["id"] for item in results])
        page += 1
    return ids[:total_count]


def fetch_imdb_id_for_movie(movie_id):
    """Fetch IMDb ID for a movie."""
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    response = requests.get(url, headers={
        "Authorization": f"Bearer {TMDB_API_KEY}"
    })
    if response.status_code != 200:
        raise Exception(f"Failed to fetch movie IMDb ID: {
                        response.status_code} - {response.text}")
    return response.json().get("imdb_id")


def fetch_imdb_id_for_tv(tv_id):
    """Fetch IMDb ID for a TV show."""
    url = f"https://api.themoviedb.org/3/tv/{tv_id}/external_ids"
    response = requests.get(url, headers={
        "Authorization": f"Bearer {TMDB_API_KEY}"
    })
    if response.status_code != 200:
        raise Exception(f"Failed to fetch TV IMDb ID: {
                        response.status_code} - {response.text}")
    return response.json().get("imdb_id")


def fetch_omdb_details(imdb_id):
    """Fetch content details from OMDB."""
    url = f"https://www.omdbapi.com/"
    response = requests.get(url, params={
        "i": imdb_id,
        "apikey": OMDB_API_KEY
    })
    if response.status_code != 200 or not response.json().get("Response", "") == "True":
        raise Exception(f"Failed to fetch OMDB details for {imdb_id}: {
                        response.status_code} - {response.text}")
    return response.json()


def save_content_to_db(content):
    """
    Save content to the database with photoUrl
    """
    content_response = requests.post(DATABASE_ENDPOINT, json=content)
    if content_response.status_code not in [200, 201]:
        raise Exception(f"Failed to save content: {
                        content_response.status_code} - {content_response.text}")

    # Extract contentId from the response
    response_data = content_response.json()
    content_id = response_data.get("contentId")
    if not content_id:
        raise Exception(
            f"Failed to retrieve contentId from response: {response_data}")
    return content_id


def main():
    # Fetch top-rated IDs
    top_movies_ids = fetch_top_rated_ids(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US", 200)
    top_tvshow_ids = fetch_top_rated_ids(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US", 200)

    # Fetch IMDb IDs
    imdb_movies_ids = [fetch_imdb_id_for_movie(
        movie_id) for movie_id in top_movies_ids]
    imdb_tvshow_ids = [fetch_imdb_id_for_tv(tv_id) for tv_id in top_tvshow_ids]

    # Process OMDB details
    for imdb_id in imdb_movies_ids + imdb_tvshow_ids:
        try:
            omdb_data = fetch_omdb_details(imdb_id)
            content = {
                "title": omdb_data["Title"],
                "director": omdb_data.get("Director", "Unknown"),
                "releaseYear": int(omdb_data["Year"][:4]) if "Year" in omdb_data else 0,
                "genre": omdb_data.get("Genre", "Unknown"),
                "type": "movie" if imdb_id in imdb_movies_ids else "tv_show",
                "synopsis": omdb_data.get("Plot", "No synopsis available."),
                "avgRating": float(omdb_data.get("imdbRating", 0.0)),
                "photoUrl": omdb_data.get("Poster", "")
            }
            save_content_to_db(content)
            print(f"Saved content: {content['title']}")
        except Exception as e:
            print(f"Failed to process IMDb ID {imdb_id}: {e}")


if __name__ == "__main__":
    main()
