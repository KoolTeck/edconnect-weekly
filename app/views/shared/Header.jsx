import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

const Header = ({ user }) => {
  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="justify-content-between"
      >
        <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            <Form className="form-inline my-2 my-lg-0 " name="searchForm ">
              <FormControl type="text" placeholder="Search Projects" />
              <Button variant="outline-light" type="submit" className="ml-3">
                Search
              </Button>
            </Form>
            <Nav>
              <Nav.Link href="/projects/id">Projects</Nav.Link>
              <Nav.Link href="/projects/submit">Submit</Nav.Link>
            </Nav>
          </Nav>

          <Nav className="justify-content-end">
            {user !== undefined ? (
              <Nav.Link href="/logout">Logout</Nav.Link>
            ) : (
              <Nav.Link href="/signup">Sign Up </Nav.Link>
            )}
            {user !== undefined ? (
              <Nav.Link id="username">
                {"Hi, "} {user.firstname}
              </Nav.Link>
            ) : (
              <Nav.Link href={"/login"}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
