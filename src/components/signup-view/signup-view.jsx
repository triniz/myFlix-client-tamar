import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Card, CardGroup } from 'react-bootstrap';

export const SignupView = () => {
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

     // Perform validation checks before submitting the form
     if (UserName.length < 5) {
        alert("Username must be at least 5 characters long");
        return;
      }
  
      if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address");
        return;
      }

    const data = {
      UserName: UserName,
      Password: password,
      email: email,
      Birthday: birthday
    };

    fetch("https://tamarflix.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Row>
      <Col xs={12} lg={10}>
        <CardGroup>
          <Card style={{ margin: '20px 0' }}>
            <Card.Body>
              <Card.Title>Please SignUp</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUserName">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    minLength="5"
                  />
                </Form.Group>

                <Form.Group controlId="formSignupPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" style={{ margin: '20px 0' }}>Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
};
