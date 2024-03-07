import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
      <Container className="text-center container-fluid mt-5 pt-5">
        <Row className="flex flex-row justify-content-center align-items-center">
          <Col>
            <h1 className="my-5">Enjoy 50% Discount</h1>
            <Button className="btn btn-lg btn-dark rounded-0" as={NavLink} to="/products">SHOP NOW</Button>
          </Col>
        </Row>
      </Container>
  );
};

export default Home;
