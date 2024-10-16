from fastapi import HTTPException
from db import db
from firebase_admin import firestore
from model.movie import MovieCreate
from model.users import User
from model.list import ListMovieCreate 
from datetime import datetime

def add_movie(movie: MovieCreate):
    new_movie = {
        'title': movie.title,
        'director': movie.director,
        'releaseYear': movie.releaseYear,
        'genre': movie.genre
    }
    movie_ref = db.collection('movies').add(new_movie)
    return {"movieId": movie_ref[1].id, "message": "Movie added successfully"}

def add_movie_to_list(list_movie: ListMovieCreate, current_user: User):
    list_doc = db.collection('lists').document(list_movie.listId).get()
    if not list_doc.exists or list_doc.to_dict()['userId'] != current_user.userId:
        raise HTTPException(status_code=403, detail="Not authorized to modify this list")
    
    movie_doc = db.collection('movies').document(list_movie.movieId).get()
    if not movie_doc.exists:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    # Set the current time
    list_movie.addedAt = datetime.utcnow()
    
    # Create a new document reference with an auto-generated ID
    list_movie_ref = db.collection('list_movies').document()
    
    # Set the listMovieId to the auto-generated ID
    list_movie.listMovieId = list_movie_ref.id
    
    # Add the document to Firestore
    list_movie_ref.set(list_movie.dict())
    
    return {"listMovieId": list_movie.listMovieId, "message": "Movie added to list successfully"}