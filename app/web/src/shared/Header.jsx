import React from 'react'
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [loggedin, setloggedin] = useState(false);
  const [username, setUsername] = useState("");
  const [cookies, removeCookie] = useCookies(["uid"]);

  let history = useHistory();

  // useEffect(() => {
  //   const getUser = () => {
  //     const setLogin = async () => {
  //       if (cookies.uid) {
  //         const resp = await fetch(`/api/users/${cookies.uid}`);
  //         const user = await resp.json();
  //         if (resp.ok) {
  //           setloggedin(true);
  //           setUsername(user.firstname);
  //         } else {
  //           setloggedin(false);
  //           setUsername("");
  //         }
  //       }
  //     };

  //     setLogin();
  //   };
  //   getUser();
  // }, []);

  // delete cookie

  useEffect(() => {
    const setLogin = async () => {
      const userFromServer = await FetchUser();
      if (userFromServer !== undefined) {
        setloggedin(true);
        setUsername(userFromServer.firstname);
      }
    };
    setLogin();
  }, []);

  const FetchUser = async () => {
    if (cookies.uid) {
      const resp = await fetch(`/api/users/${cookies.uid}`);
      const user = await resp.json();
      return user;
    }
  };

  function deleteCookie(cname) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  const logOut = () => {
    deleteCookie("uid");
    setloggedin(false);
    setUsername("");
    history.push("/");
  };

  return (
    <>
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
              <Nav.Link href="/projects">Projects</Nav.Link>
              <Nav.Link href="/projects/submit">Submit</Nav.Link>
            </Nav>
          </Nav>

          <Nav className="justify-content-end">
            {loggedin ? (
              <Nav.Link onClick={logOut}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/signup">Signup</Nav.Link>
            )}
            {loggedin ? (
              <Nav.Link>
                {"Hi, "} {username}
              </Nav.Link>
            ) : (
              <Nav.Link href={"/login"}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
