import React from 'react'
import { Alert, Button } from "react-bootstrap";

const Error = () => {
  return (
    <div className="container error">
      <Alert variant="danger">
        <h2>OOPS!!!</h2>
        <p>Probably a link is broken or you miss your way what you can do:</p>
        <Button variant="primary" href="/">
          Go Back home
        </Button>
      </Alert>
    </div>
  );
};

export default Error;
