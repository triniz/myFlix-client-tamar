import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./favorite-movies.scss";
import { MovieCard } from "../movie-card/movie-card";


export const FavoriteMovies = ({ movies, onAddFavorite, onRemoveFavorite }) => {
  let favorites = JSON.parse(localStorage.getItem("user")).FavoriteMovies;

  return (
    <div className="fav-movie-container">
      <h2 className="my-custom-class">Favorite Movies</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {movies &&
          movies
            .filter((movie) => favorites.includes(movie.id))
            .map((movie) => (
              <Col key={movie.id}>
                <MovieCard
                  movie={movie}
                  fav={favorites.includes(movie.id)}
                  onAddToFavorites={onAddFavorite}
                  onRemoveFromFavorites={onRemoveFavorite}
                />
              </Col>
            ))}
      </Row>
    </div>
  );
};