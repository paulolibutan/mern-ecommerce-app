import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const ProductCard = ({ products }) => {
  return (
    <Col sm={6} md={4} className="mb-3">
      <Card className="rounded-0 h-100">
        <Card.Img
          className="rounded-0 img-fluid"
          variant="top"
          src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Card.Body>
          <Card.Title className="product-card-title">
            {products.name}
          </Card.Title>
          <Card.Text>{products.description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Text className="product-card-price">
            <NumericFormat
              value={products.price.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link
            to={`/products/${products._id}`}
            className="rounded-0 w-100 btn btn-dark btn-sm"
          >
            Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

ProductCard.propTypes = {
  products: PropTypes.object,
};

export default ProductCard;
