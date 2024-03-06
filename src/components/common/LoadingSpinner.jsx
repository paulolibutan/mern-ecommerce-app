import { Col, Container, Row } from "react-bootstrap";
import { Blocks } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <Container className="text-center">
      <Row className="flex flex-row justify-content-center align-items-center align-content-center vh-100 w-100">
        <Col xs={12}>
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingSpinner;
