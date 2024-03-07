import { Card, Button, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const ProductCard = ({ products }) => {
  return (
    <Col sm={6} md={4} className="mb-3">
      <Card className="rounded-0">
        <Card.Img className="rounded-0 img-fluid" variant="top" src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
        <Card.Body>
          <Card.Title>{products.name}</Card.Title>
          <Card.Text>{products.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
            <Button className="rounded-0 w-100 btn btn-dark btn-sm">BUY NOW</Button>
          </Card.Footer>
      </Card>
    </Col>
  );
};

ProductCard.propTypes = {
  products: PropTypes.object,
};

export default ProductCard;
