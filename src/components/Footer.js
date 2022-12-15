import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {

  return(

    <footer className="footer bg-dark">
 
      <Container>

        <Row>
 
          <Col xs="12" className="text-center py-3">
 
            <p className="text-white mb-0">© {new Date().getFullYear()} <Link to="/" className="text-white text-decoration-none">MoviesKing.com</Link></p>
 
          </Col>

        </Row>

      </Container>

    </footer>

  ); 

}