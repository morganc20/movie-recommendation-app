"""
   contains the service functions for the content endpoints.
"""
import random
from fastapi import HTTPException
from db import db
from model.content import ContentCreate


def add_content(content: ContentCreate):
    """
    Add content (movie or TV show).
    """
    new_content = {
        'title': content.title,
        'director': content.director,
        'releaseYear': content.releaseYear,
        'genre': content.genre,
        'type': content.type,
        'synopsis': content.synopsis,
        'avgRating': content.avgRating,
        'photoUrl': content.photoUrl
    }
    content_ref = db.collection('content').add(new_content)
    return {"contentId": content_ref[1].id, "message": "Content added successfully"}


def clear_all_content():
    """
    Clear all content.
    """
    content_docs = db.collection('content').get()
    for doc in content_docs:
        doc.reference.delete()
    return {"message": "All content removed successfully"}


def get_all_content():
    """
    Get all content. 
    """
    content_docs = db.collection('content').get()
    return [doc.to_dict() for doc in content_docs]


def get_recommendations(amount: int, content_type: str, shuffle: bool = False, genre: str = None, avg_rating: float = 8.8):
    """
    Get content recommendations. Amount is the number of recommendations to return.
    content_type is either "movie" or "tv_show".  
    genre is format "Documentary, Family" so the user can search for multiple genres.
    """
    content_docs = db.collection('content').where('avgRating', '>', avg_rating).where(
        'type', '==', content_type).limit(amount).get()

    if genre:
        genre_list = genre.split(', ')
        content_docs = db.collection('content').where(
            'type', '==', content_type).where('genre', 'in', genre_list).limit(amount).get()

    content_docs = list(content_docs)
    if shuffle:
        random.shuffle(content_docs)

    return [doc.to_dict() for doc in content_docs]


def get_content_by_id(content_id: str):
    """
    Get content by content ID.
    """
    content_doc = db.collection('content').document(content_id).get()
    if not content_doc.exists:
        raise HTTPException(status_code=404, detail="Content not found")

    # Add content but also include the content ID
    return {**content_doc.to_dict(), "contentId": content_id}


def get_content_by_genre(genre: str, amount: int):
    """
    Get content by genre, sort by avgRating (highest to lowest), and filter out duplicates
    by comparing name and avgRating.
    """
    genre_list = [g.strip() for g in genre.split(',')]

    content_docs = db.collection('content').where(
        'genre', 'in', genre_list).get()

    sorted_docs = sorted(
        [doc.to_dict() for doc in content_docs],
        # Default avgRating to 0 if missing
        key=lambda x: x.get('avgRating', 0),
        reverse=True
    )

    unique_contents = []
    seen_entries = set()
    for content in sorted_docs:
        name = content.get('name', '').strip()
        avg_rating = content.get('avgRating', 0)

        entry_key = (name, avg_rating)
        if entry_key not in seen_entries:
            seen_entries.add(entry_key)
            unique_contents.append(content)

    for content in unique_contents:
        content['contentId'] = db.collection('content').where(
            'title', '==', content['title']).get()[0].id

    return unique_contents[:amount]


def get_content_by_title(title: str):
    """
    Get content by title.
    """
    content_docs = db.collection('content').where('title', '==', title).get()
    return [doc.to_dict() for doc in content_docs]


def get_content_by_director(director: str):
    """
    Get content by director.
    """
    content_docs = db.collection('content').where(
        'director', '==', director).get()
    return [doc.to_dict() for doc in content_docs]


def get_content_by_release_year(year: int):
    """
    Get content by release year.
    """
    content_docs = db.collection('content').where(
        'releaseYear', '==', year).get()
    return [doc.to_dict() for doc in content_docs]


def get_content_by_type(content_type: str):
    """
    Get content by type (e.g., "movie", "tv_show", "animation").
    """
    content_docs = db.collection('content').where(
        'type', '==', content_type).get()
    return [doc.to_dict() for doc in content_docs]


def edit_content_by_id(content_id: str, updated_content: ContentCreate):
    """
    Edit content by ID.
    """
    content_ref = db.collection('content').document(content_id)
    if not content_ref.get().exists:
        raise HTTPException(status_code=404, detail="Content not found")

    update_data = {
        'title': updated_content.title,
        'director': updated_content.director,
        'releaseYear': updated_content.releaseYear,
        'genre': updated_content.genre,
        'type': updated_content.type,
        'synopsis': updated_content.synopsis,
        'avgRating': updated_content.avgRating
    }
    content_ref.update(update_data)
    return {"message": "Content updated successfully"}


def remove_content_by_id(content_id: str):
    """
    Remove content by ID.
    """
    content_ref = db.collection('content').document(content_id)
    if not content_ref.get().exists:
        raise HTTPException(status_code=404, detail="Content not found")

    content_ref.delete()
    return {"message": "Content removed successfully"}
