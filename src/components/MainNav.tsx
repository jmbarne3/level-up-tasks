import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainNav = () => {
    return (
        <Navbar>
            <Navbar.Brand as={Link} to='/'>Level-Up Tasks</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav;
