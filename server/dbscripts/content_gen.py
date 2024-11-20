import argparse
from datetime import datetime
from pydantic import BaseModel
import requests
import uuid


class ContentCreate(BaseModel):
    """
    ContentCreate is the Pydantic model for creating content.
    """
    contentId: str
    title: str
    director: str
    releaseYear: int
    genre: str
    type: str  # "movie" or "tv_show"
    synopsis: str
    avgRating: float


def fetch_genres(api_key: str):
    """Fetch the mapping of genre IDs to genre names."""
    url = f"https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        genres = response.json().get('genres', [])
        return {genre['id']: genre['name'] for genre in genres}
    else:
        raise Exception(f"Failed to fetch genres: {
                        response.status_code} - {response.text}")


def fetch_content(api_key: str, content_type: str, page: int = 1):
    """Fetch movies or TV shows based on the content type."""
    url = f"https://api.themoviedb.org/3/{
        content_type}/popular?api_key={api_key}&page={page}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get('results', [])
    else:
        raise Exception(f"Failed to fetch {content_type} data: {
                        response.status_code} - {response.text}")


def get_director(movie_id: int, api_key: str, content_type: str):
    """Fetch director/creator based on the content type."""
    url = f"https://api.themoviedb.org/3/{content_type}/{
        movie_id}/credits?api_key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        crew = response.json().get('crew', [])
        for member in crew:
            if member.get('job') == 'Director':
                return member.get('name', 'Unknown Director')
    return 'Unknown Director'


def post_to_database(content: ContentCreate, endpoint_url: str):
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
    }
    response = requests.post(
        endpoint_url, headers=headers, json=content.dict())
    if response.status_code in [200, 201]:
        print(f"Successfully added: {content.title}")
    else:
        print(f"Failed to add: {
              content.title} - {response.status_code} - {response.text}")


def main(total_content: int):
    api_key = '2ff78d2977bbc53f580903e50d07dcfd'  # too lazy to hide
    database_endpoint = "http://127.0.0.1:8000/content"
    content_per_page = 20
    pages_needed = (total_content // content_per_page) + 1

    try:
        genre_mapping = fetch_genres(api_key)

        for content_type in ['movie', 'tv']:  # Loop through both movies and TV shows
            for page in range(1, pages_needed + 1):
                if total_content <= 0:
                    return  # Exit if we have fetched enough content
                contents = fetch_content(api_key, content_type, page=page)
                for content in contents:
                    if total_content <= 0:
                        return  # Exit if we have fetched enough content
                    try:
                        director = get_director(
                            content.get('id'), api_key, content_type)
                        genre_names = [genre_mapping.get(
                            genre_id, "Unknown Genre") for genre_id in content.get('genre_ids', [])]
                        release_date = content.get(
                            'release_date', content.get('first_air_date', '0000'))
                        release_year = int(
                            release_date[:4]) if release_date else 0
                        # Fetch the average rating from content data
                        avg_rating = content.get('vote_average', 0.0)

                        content_data = ContentCreate(
                            contentId=str(uuid.uuid4()),
                            title=content.get('title', content.get(
                                'name', 'Unknown Title')),
                            director=director,
                            releaseYear=release_year,
                            genre=", ".join(genre_names),
                            type='tv_show' if content_type == 'tv' else 'movie',
                            synopsis=content.get(
                                'overview', 'No synopsis available.'),
                            avgRating=avg_rating
                        )
                        post_to_database(content_data, database_endpoint)
                        total_content -= 1  # Decrement the count of total content needed
                    except Exception as content_error:
                        print(f"Error processing content: {
                              content.get('title', 'Unknown')} - {content_error}")

    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Fetch and store content from TMDB API.")
    parser.add_argument('total_content', type=int,
                        help="Total number of movies and TV shows to fetch.")
    args = parser.parse_args()

    main(args.total_content)
