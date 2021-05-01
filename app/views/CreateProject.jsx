import React from "react";
import Layout from "./shared/Layout";
import { Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";

const CreateProject = ({ data, error, user }) => {
  const [name, setName] = useState("");
  const [abstract, setAbstract] = useState("");
  const [tags, setTags] = useState("");
  const [authors, setAuthors] = useState("");
  const formData = data.length > 0 ? JSON.parse(data) : {};
  const [show, setShow] = useState(true);
  return (
    <Layout user={user}>
      <div className="mx-auto w-50 mt-5">
        <h2>Submit Project</h2>
        {show && error.length > 0 && (
          <Alert
            variant="danger"
            onClose={() => setShow(false)}
            dismissible="true"
          >
            <h6>Oh snap! You got an error!</h6>
            {error.map((err, i) => {
              return <p key={i}>{err}</p>;
            })}
          </Alert>
        )}
        <Form
          action="/projects/submit"
          method="post"
          name="submitProject"
          id="createProjectForm"
        >
          <Form.Row>
            <Form.Label htmlFor="name"> Project Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name ? formData.name : name}
              onChange={(eve) => {
                setName(eve.target.value);
              }}
              name="name"
            />
          </Form.Row>

          <Form.Row>
            <Form.Label htmlFor="abstract"> Project Abstract</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={formData.abstract ? formData.abstract : abstract}
              onChange={(eve) => {
                setAbstract(eve.target.value);
              }}
              name="abstract"
            />
          </Form.Row>

          <Form.Row>
            <Form.Label htmlFor="authors"> Author(s)</Form.Label>
            <Form.Control
              value={formData.authors ? formData.authors : authors}
              onChange={(eve) => {
                setAuthors(eve.target.value);
              }}
              name="authors"
            />
          </Form.Row>

          <Form.Row>
            <Form.Label htmlFor="tags"> Tag(s)</Form.Label>
            <Form.Control
              value={formData.tags ? formData.tags : tags}
              onChange={(eve) => {
                setTags(eve.target.value);
              }}
              name="tags"
            />
          </Form.Row>

          <Button className="mt-3 mb-3" variant="primary" type="submit">
            Continue
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateProject;
