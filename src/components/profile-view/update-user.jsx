import React, { useState, } from "react";
import { Form, Button } from "react-bootstrap";

export default function UpdateUser({ user, handleSubmit }) {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e, updatedUser)}>
      <h2 style={{ color: 'DarkSlateGray' }}>Want to change some info?</h2>
      <Form.Group controlId="formUserName">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="UserName"
          value={updatedUser.UserName}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={updatedUser.password}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>
      <Form.Group controlId="Emailform">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={updatedUser.email}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>
      <Form.Group controlId="formDateOfBirth">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control
          type="date"
          name="dateOfBirth"
          value={updatedUser.dateOfBirth}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="my-2">
        Update
      </Button>
    </form>
  );
}
