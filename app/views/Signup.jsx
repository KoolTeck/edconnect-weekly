import React from "react";
import Layout from "./shared/Layout";
import { Form, Alert, Col, Button } from "react-bootstrap";
import { useState, useRef } from "react";

const Signup = ({ programs, graduationYears, errors, data }) => {
  // handle register

  const formData = data.length > 0 ? JSON.parse(data) : {};
  const [show, setShow] = useState(true);
  const [firstName, setFirstName] = useState(formData.firstname);
  const [lastName, setLastName] = useState(formData.lastname);
  const [matricNumber, setMatricNo] = useState(formData.matricNumber);
  const [email, setEmail] = useState(formData.email);
  const [password, setPassword] = useState(formData.password);
  const refc = useRef(email);

  return (
    <Layout>
      <div className="mx-auto w-75 p-5">
        <h1>Signup</h1>
        {show && errors.length > 0 && (
          <Alert
            variant="danger"
            onClose={() => setShow(false)}
            dismissible="true"
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            {JSON.parse(errors).map((err, i) => {
              return <p key={i}>{err}</p>;
            })}
          </Alert>
        )}

        <Form id="signupForm" action="signup" method="post">
          <Form.Row>
            <Col>
              <Form.Label htmlFor="firstname">First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={firstName}
                onChange={(eve) => setFirstName(eve.target.value)}
              />
            </Col>
            <Col>
              <Form.Label htmlFor="lastname">Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={lastName}
                onChange={(eve) => setLastName(eve.target.value)}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Label htmlFor="email">Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                autoComplete="true"
                ref={refc}
                onChange={(eve) => setEmail(eve.target.value)}
              />
            </Col>
            <Col>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="true"
                name="password"
                value={password}
                onChange={(eve) => setPassword(eve.target.value)}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Label htmlFor="matricNumber">Matric Number:</Form.Label>
              <Form.Control
                name="matricNumber"
                value={matricNumber}
                onChange={(eve) => setMatricNo(eve.target.value)}
              />
            </Col>
            <Col>
              <Form.Label htmlFor="program">Program:</Form.Label>
              <Form.Control as="select" name="program">
                {programs.map((prog, i) => {
                  const progOption = prog.split(" ");
                  return (
                    <option key={i} value={progOption}>
                      {progOption}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label htmlFor="graduationYear">Graduation Year:</Form.Label>
              <Form.Control as="select" name="graduationYear">
                {graduationYears.map((gradYear, i) => {
                  return (
                    <option key={i} value={gradYear}>
                      {gradYear}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Row>

          <Button className="mt-3" variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Signup;
