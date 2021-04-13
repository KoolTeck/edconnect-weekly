import React from "react";
import Layout from "./shared/Layout";
import { Form, Alert, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { setCookie } from "./App";

const Signup = () => {
  const [programs, setPrograms] = useState([]);
  const [graduationYears, setGraduationYears] = useState([]);

  const [alert, setAlert] = useState([]);
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [matricNo, setMatricNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progOnsubmit, setProgramOnChange] = useState("");
  const [gradYearOnsubmit, setGradYearOnSelect] = useState("");
  let history = useHistory();

  useEffect(() => {
    const getPrograms = async () => {
      const resp = await fetch("/api/programs");
      if (resp.ok) {
        const data = await resp.json();
        setPrograms(data);
      } else {
        throw new Error(`HTTP Error ${resp.status}`);
      }
    };
    getPrograms();
  }, []);

  useEffect(() => {
    const getGradYear = async () => {
      const resp = await fetch("/api/graduationYears");
      if (resp.ok) {
        const data = await resp.json();
        setGraduationYears(data);
      } else {
        throw new Error(`HTTP Error ${resp.status}`);
      }
    };
    getGradYear();
  }, []);
  // handle register
  const handleform = async (eve) => {
    eve.preventDefault();
    await addUser();
  };

  //handle signup
  const addUser = async () => {
    const userData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      matricNumber: matricNo,
      program: progOnsubmit,
      graduationYear: gradYearOnsubmit,
    };
    const resp = await fetch("/api/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const user = await resp.json();
    if (resp.status === 200) {
      setCookie("uid", user.data.id);

      history.push("/");
    } else {
      setAlert(user.errors);
      setShow(true);
    }
  };

  function AlertDanger() {
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          {show &&
            alert.map((err, i) => {
              return <p key={i}>{err}</p>;
            })}
        </Alert>
      );
    }
  }
  return (
    <Layout>
      <div className="mx-auto w-75 p-5">
        <h1>Signup</h1>

        {show ? <AlertDanger /> : null}
        <Form id="signupForm" onSubmit={handleform}>
          <Form.Row>
            <Col>
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                value={firstName}
                name="firstName"
                onChange={(eve) => setFirstName(eve.target.value)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(eve) => setLastName(eve.target.value)}
                name="lastName"
              ></Form.Control>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Label htmlFor="email">Email Address:</Form.Label>
              <Form.Control
                value={email}
                onChange={(eve) => setEmail(eve.target.value)}
                type="email"
                name="email"
              />
            </Col>
            <Col>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(eve) => setPassword(eve.target.value)}
                type="password"
                autoComplete="true"
                name="password"
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Label htmlFor="matricNumber">Matric Number:</Form.Label>
              <Form.Control
                value={matricNo}
                name="matricNo"
                onChange={(eve) => setMatricNo(eve.target.value)}
                name="matricNumber"
              />
            </Col>
            <Col>
              <Form.Label htmlFor="program">Program:</Form.Label>
              <Form.Control
                as="select"
                value={progOnsubmit}
                onChange={(eve) => setProgramOnChange(eve.target.value)}
              >
                {programs.map((prog, i) => {
                  const progOption = prog.split(" ").join("_");
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
              <Form.Control
                as="select"
                value={gradYearOnsubmit}
                onChange={(eve) => {
                  setGradYearOnSelect(eve.target.value);
                }}
              >
                {graduationYears.map((gradYear, i) => {
                  return <option key={i}>{gradYear}</option>;
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
