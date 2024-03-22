import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useLoginMutation } from '../services/appApi';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, isLoading, isError }] = useLoginMutation();
  
  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Container>
        <Row>
            <Col md={6} className='login__form--container'>
                <Form style={{ width: "100%" }} onSubmit={handleLogin}>
                  <h1>Login to your account</h1>
                  {isError && <Alert variant="danger">{error.data}</Alert>}
                  <Form.Group>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Group>
                  
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                  
                  <Form.Group>
                    <Button type="submit" disabled={isLoading}>Login</Button>
                  </Form.Group>
                  <p>
                    You don't have an account? <Link to="/signup">Create account</Link>{" "}
                    </p>
                </Form>
            </Col>
            <Col md={6} className="login__image--container"></Col>
        </Row>
    </Container>
  );
}

export default Login