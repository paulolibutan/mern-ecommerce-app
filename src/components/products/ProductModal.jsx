import { Container, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const ProductModal = ({ showModal, closeModal, title, children }) => {
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={closeModal}
      keyboard
      dialogClassName="modal-content"
    >
      <Modal.Header closeButton>
        <Container>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center"
          >
            {title}
          </Modal.Title>
        </Container>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

ProductModal.propTypes = {
  props: PropTypes.object,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
  isActive: PropTypes.bool,
  buttonActive: PropTypes.func,
};

export default ProductModal;
