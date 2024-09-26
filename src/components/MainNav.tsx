import { onAuthStateChanged, User, getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase-config";

const MainNav = () => {
  const [user, setUser] = useState<User|null>(null);
  const navigate = useNavigate();

  const signUserOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
      navigate('/login');
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        console.log("User is logged out!");
      }
    });
  }, []);

  return (
    <Navbar expand="lg" className="mb-4" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to='/'>Level-Up Tasks</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {!user && (
          <Link className="btn btn-outline-primary" to="/login">Login</Link>
        )}
        {user && (
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="user-dropdown">
              {user.email}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={signUserOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default MainNav;
