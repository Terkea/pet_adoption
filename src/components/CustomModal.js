import React from "react";
import { Modal, Button } from "antd";

class CustomModal extends React.Component {
  state = { visible: true };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>you can do r form latter here</p>
          <p>input box</p>
        </Modal>
      </>
    );
  }
}

export default CustomModal;
