import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase-config';
import React, { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [error, setError] = useState("");

  const SignUpWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if ( !username || !password ) {
      setError("You must provide a username and password!");
    }

    if ( password !== repPassword ) {
      setError("The two passwords you entered do not match!");
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );

      const user = userCredentials.user;

      await setDoc(doc(db, 'userProfiles', user.uid), {
        user_id: user.uid,
        created: Timestamp.now(),
        updated: Timestamp.now()
      });

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center vh-100 align-items-center">
      <Card className="col-12 col-md-6 col-lg-4">
        <Card.Header>
          <h1>Create Account</h1>
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
          <Form.Control type="password" name="password" className="mb-2" value={password} onChange={e => setPassword(e.target.value!)} />
          <Form.Label>Re-Enter Password: </Form.Label>
          <Form.Control type="password" name="password" className="mb-4" value={repPassword} onChange={e => setRepPassword(e.target.value!)} />
          <Button type="button" variant="primary" onClick={SignUpWithEmail}>Create Account</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
