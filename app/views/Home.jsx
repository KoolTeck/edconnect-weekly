import React from "react";
import Layout from "./shared/Layout";
import { Jumbotron, Button, Container, Row, Col, Card } from "react-bootstrap";

const Home = ({ projects, user }) => {
  projects.length = 4;
  return (
    <Layout user={user}>
      <>
        <section>
          <Jumbotron>
            <h1>Welcome to Project Explorer</h1>
            <p>
              Project Explorer is a repository for final year projects accross
              all departments at your institution. You can submit your project
              and search for projects submitted by others to learn from.
            </p>
            <Button variant="primary" size="lg" href="/signup">
              Get Started
            </Button>
            <Button variant="primary" size="lg" href="/login" className="ml-3">
              Login
            </Button>
          </Jumbotron>
        </section>
        {/* <!-- single project begins --> */}
        <section>
          <Container>
            <Row className=" p-2 showcase">
              {projects.map((project) => {
                const authors = project.authors
                  .map((author) => author.trim())
                  .join(", ");
                const tags = project.authors
                  .map((tag) => "$" + tag.trim())
                  .join(", ");
                return (
                  <Col key={project.id} className="m-2">
                    <Card>
                      <Card.Body>
                        <Card.Title>
                          {
                            <Card.Link href={`/project/${project.id}`}>
                              {project.name}
                            </Card.Link>
                          }
                        </Card.Title>
                        <Card.Subtitle>
                          {<h6 className="mb-2 text-muted">{authors}</h6>}
                        </Card.Subtitle>
                        <Card.Text>{project.abstract}</Card.Text>
                        <Card.Link href={"/"}>
                          <p className="mb-2 text-muted"> {tags}</p>
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>

        {/* <!-- single project ends --> */}
      </>
    </Layout>
  );
};
export default Home;
