import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Card, Container, Form, Button, ButtonGroup } from "react-bootstrap";

import { auth } from '../firebase-config';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const SignInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("You must enter a username and password.")
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        username,
        password
      ).then(() => {
        navigate('/');
      })

    } catch (err: any) {
      setError(err.message);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then(() => {
        navigate('/');
      });

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center vh-100 align-items-center">
      <Card className="col-12 col-md-6 col-lg-4">
        <Card.Header>
          <h1>Login</h1>
        </Card.Header>
        <Card.Body>
          { error !== "" && (
            <Alert variant="danger">
              <p>{error}</p>
            </Alert>
          ) }
          <Form.Label>Username: </Form.Label>
          <Form.Control type="email" name="username" className="mb-2" value={username} onChange={e => setUsername(e.target.value!)} />
          <Form.Label>Enter Password: </Form.Label>
          <Form.Control type="password" name="password" className="mb-4" value={password} onChange={e => setPassword(e.target.value!)} />
          <Button type="submit" className="me-4" variant="primary" onClick={SignInWithEmail}>Login</Button>
          <hr />
          <ButtonGroup className="w-100">
            <Link className="btn btn-outline-primary" to="/signup">Create Account</Link>
            <Button type="button" variant="outline-info" onClick={SignInWithGoogle}>Login with Google</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
