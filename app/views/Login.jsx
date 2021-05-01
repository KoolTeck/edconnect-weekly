import React from "react";
import Layout from "./shared/Layout";
import { Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";

const Login = ({ error, data }) => {
  // const formData = data.length > 0 ? JSON.parse(data) : {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  return (
    <Layout>
      <div className="mx-auto w-50 mt-5 p-5">
        <h2>Login Here</h2>
        {show && error.length > 0 && (
          <Alert
            variant="danger"
            onClose={() => setShow(false)}
            dismissible="true"
          >
            <h6>Oh snap! You got an error!</h6>
            {JSON.parse(error)[0]}
          </Alert>
        )}
        <Form action="login" method="post" id="loginForm">
          <Form.Row>
            <Form.Label htmlFor="name"> Email Address:</Form.Label>
            <Form.Control
              type="email"
              placeholder={"enter email"}
              value={email}
              name="email"
              onChange={(eve) => {
                setEmail(eve.target.value);
              }}
            />
          </Form.Row>

          <Form.Row>
            <Form.Label htmlFor="password"> Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              name="password"
              onChange={(eve) => {
                setPassword(eve.target.value);
              }}
              autoComplete="true"
            />
          </Form.Row>

          <Button className="mt-3 mb-3" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
