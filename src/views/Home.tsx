import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

import { auth } from "../firebase-config";

const Home = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        console.log("User is logged out!");
      }
    });
  }, []);

  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
};

export default Home;
