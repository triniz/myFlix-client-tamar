import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export const MovieCard = ({ fav, movie, onAddToFavorites, onRemoveFromFavorites  }) => {
  const maxDescriptionLength = 100;
  const truncatedDescription =
    movie.description.length > maxDescriptionLength
      ? `${movie.description.substring(0, maxDescriptionLength)}...`
      : movie.description;

  const [isFavorite, setIsFavorite] = useState(fav);

      useEffect(() => {
        setIsFavorite(fav);
        console.log("MovieCard fav prop:", movie.title, fav);
      }, [fav]);


  const handleAddToFavorites = (event) => {
    event.preventDefault();
    onAddToFavorites(movie.id); 
    setIsFavorite(true);
  };

  const handleRemoveFromFavorites = (event) => {
    event.preventDefault();
    onRemoveFromFavorites(movie.id);
    setIsFavorite(false);
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      handleAddToFavorites(event);
    }
  };

  return (
    <Card className="h-100">
      <Card.Img
        className="movie-card-img"
        variant="top"
        src={movie.image}
        alt={movie.title}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{truncatedDescription}</Card.Text>
        <div className="button-group">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button
            className="favorite-button"
            variant={isFavorite ? 'secondary' : 'outline-primary'}
            onClick={!isFavorite ? handleFavoriteClick : handleRemoveFromFavorites} //use handleFavoriteClick for favorite button click
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};
