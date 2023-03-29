/* eslint-disable react/prop-types */

import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./ConfirmDialog.module.css";

const ConfirmDialog = ({ title, body, visible, setVisible, onOk }) => {
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        show={visible}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onClose={handleClose} closeButton={false}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={onOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDialog;
