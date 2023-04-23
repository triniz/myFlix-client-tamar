import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import UpdateUser from "./update-user";

export const ProfileView = ({user,
  movies,
  favoritesMovies,
  addToFavorites,
  removeFromFavorites,}) => {

  useEffect(() => {
    fetch("/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        const loggedInUser = data.find((u) => u.UserName === "your-UserName");
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error)
      });

    fetch("/movies")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const updateUser = (updatedUser) => {
    fetch(`/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: updatedUser.email,
        name: updatedUser.name,
        birthday: updatedUser.birthday,
        UserName: updatedUser.UserName,
        password: updatedUser.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserInfoChange = (updatedUser) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <>
      <h1 style={{ color: 'DarkSlateGray' }}>Profile</h1>
      <Container>
        <Row>
          <Col md={4}>
            <UserInfo
              email={user.email}
              name={user.name}
              birthday={user.birthday}
              onUserChange={handleUserInfoChange}
            />
            <UpdateUser user={user} handleSubmit={updateUser} />
          </Col>
          <Col md={6}>
            <FavoriteMovies
              movies={movies}
              favoritesMovies={favoritesMovies}
              onAddFavorite={addToFavorites}
              onRemoveFavorite={removeFromFavorites}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};