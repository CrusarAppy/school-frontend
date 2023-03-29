/* eslint-disable react/prop-types */

import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./MessageModal.module.css";
import { FilePdf } from "react-bootstrap-icons";

const MessageModal = ({ data, showColumn, visible, setVisible, file }) => {
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
        size="lg"
      >
        <Modal.Header closeButton onClose={handleClose}>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.messageWrapper}>
            {data &&
              showColumn.map((element, index) => {
                return (
                  <div key={index} className={styles.message}>
                    <div className={styles.key}>{element + " :"}</div>
                    <div className={styles.value}>{data[[element]]}</div>{" "}
                  </div>
                );
              })}
            {file && (
              <div className={styles.message}>
                <div className={styles.key}>{file.title + " :"}</div>
                <div className={styles.value}>
                  <a
                    className={styles.fileIcon}
                    href={file.file}
                    target="__blank"
                    download
                  >
                    <FilePdf size="40px" />
                  </a>
                </div>{" "}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MessageModal;
