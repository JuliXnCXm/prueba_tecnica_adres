import React from 'react'
import Modal from "react-bootstrap/Modal";
import "../styles/components/AcquisitionModal.css";

const AcquisitionModal = ({ show, handleClose , children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default AcquisitionModal
