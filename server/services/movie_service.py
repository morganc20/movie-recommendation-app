from fastapi import HTTPException
from db import db
from firebase_admin import firestore
from model.movie import MovieCreate
from model.users import User

def add_movie(movie: MovieCreate):
    new_movie = {
        'title': movie.title,
        'director': movie.director,
        'releaseYear': movie.releaseYear,
        'genre': movie.genre
    }
    movie_ref = db.collection('movies').add(new_movie)
    return {"movieId": movie_ref[1].id, "message": "Movie added successfully"}

def add_movie_to_list(list_id: str, movie_id: str, current_user: User):
    list_doc = db.collection('lists').document(list_id).get()
    if not list_doc.exists or list_doc.to_dict()['userId'] != current_user.userId:
        raise HTTPException(status_code=403, detail="Not authorized to modify this list")
    
    movie_doc = db.collection('movies').document(movie_id).get()
    if not movie_doc.exists:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    list_movie = {
        'listId': list_id,
        'movieId': movie_id,
        'addedAt': firestore.SERVER_TIMESTAMP
    }
    list_movie_ref = db.collection('list_movies').add(list_movie)
    
    return {"listMovieId": list_movie_ref[1].id, "message": "Movie added to list successfully"}