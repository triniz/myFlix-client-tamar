import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Card, CardGroup } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!UserName.trim()) {
      errors.UserName = "Username is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      UserName: UserName,
      Password: password
    };

    fetch("https://tamarflix.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Row>
      <Col xs={12} lg={10}>
        <CardGroup>
          <Card style={{ margin: '20px 0' }}>
            <Card.Body>
              <Card.Title>Please Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUserLogin">
                  <Form.Label>UserName:</Form.Label>
                  <Form.Control
                    type="text"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    minLength="5"
                  />
                  {formErrors.UserName && <div>{formErrors.UserName}</div>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {formErrors.password && <div>{formErrors.password}</div>}
                </Form.Group>
                <Button variant="primary" type="submit" style={{ margin: '20px 0' }}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
};
