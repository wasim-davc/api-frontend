import {Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <Container className="pt-4 pb-5">
      <Row className="py-5">
        <Col xs="12" className="text-center">
          <h1 className="mb-4 fw-bold">Oops!</h1>
          <h2 className="mb-4 fw-bold">404 Not Found</h2>
          <p className="mb-4">Sorry, an error has occured, Requested page not found!</p>
          <Button variant="success" as={Link} to="/" className="m-1">Take Me Home</Button>
        </Col>
      </Row>
    </Container>
  );
}
