import { Container } from "react-bootstrap";
import { getAuth } from "firebase/auth";

const Home = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <Container>
      {!currentUser && (
        <h1>Home</h1>
      )}
      {currentUser && (
        <h1>Logged In: Home</h1>
      )}
    </Container>
  );
};

export default Home;
