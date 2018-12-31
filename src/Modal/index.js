import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactJoyride, { ACTIONS, EVENTS } from "react-joyride";
import Modal from "react-modal";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  background: #ccc
    repeating-linear-gradient(
      45deg,
      #606dbc,
      #606dbc 10px,
      #465298 10px,
      #465298 20px
    );
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const Button = styled.button`
  background-color: #008e26;
  color: #fff;
  margin-bottom: 8px;
  padding: 8px;

  + button {
    margin-left: 15px;
  }
`;

class ModalDemo extends Component {
  state = {
    continuous: true,
    modalIsOpen: false,
    run: false,
    steps: [
      {
        content: "Our awesome projects",
        placement: "bottom",
        target: ".ReactModal__Content button:nth-of-type(1)",
        textAlign: "center"
      },
      {
        content:
          "Can be advanced by clicking an element through the overlay hole.",
        disableCloseOnEsc: true,
        disableOverlayClicks: true,
        placement: "bottom",
        target: ".ReactModal__Content button:nth-of-type(2)",
        title: "Our Mission"
      },
      {
        content: "This step tests what happens when a target is missing",
        target: ".ReactModal__Content button:nth-of-type(3)",
        title: "Unmounted target",
        placement: "bottom"
      },
      {
        content: (
          <div>
            <h3>We are the people</h3>
            <svg
              width="96px"
              height="96px"
              viewBox="0 0 96 96"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </div>
        ),
        target: ".ReactModal__Content button:nth-of-type(4)",
        placement: "bottom"
      }
    ],
    stepIndex: 0
  };

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.modalIsOpen && this.state.modalIsOpen) {
      this.start();
    }
  }

  start = () => {
    this.setState({
      run: true,
      stepIndex: 0
    });
  };

  handleJoyrideCallback = (data: ReactJoyride.CallbackProps) => {
    const { joyride } = this.props;
    const { action, index, type } = data;
    let stepIndex = this.state.stepIndex;

    if (type === EVENTS.STEP_AFTER) {
      // Update state to advance the tour
      stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
    } else if (type === EVENTS.TOOLTIP_CLOSE) {
      stepIndex = index + 1;
    } else if (type === EVENTS.TARGET_NOT_FOUND) {
      stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
    }

    this.setState({ stepIndex });

    if (typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      run: false
    });
  };

  afterOpenModal = () => {
    this.setState({
      run: true
    });
  };

  render() {
    const { modalIsOpen } = this.state;
    const joyrideProps = {
      ...this.state,
      ...this.props.joyride
    };

    const customStyles = {
      content: {
        height: "40%",
        textAlign: "center"
      }
    };

    return (
      <Wrapper>
        <ReactJoyride
          showSkipButton
          {...joyrideProps}
          callback={this.handleJoyrideCallback}
          styles={{
            options: {
              arrowColor: "#e3ffeb",
              backgroundColor: "#e3ffeb",
              primaryColor: "#000",
              textColor: "#004a14",
              overlayColor: "rgba(79, 26, 0, 0.4)"
            }
          }}
        />
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>A react-modal example</h2>
          <p>I am a modal</p>
          <Button tabIndex={1}>tab navigation</Button>
          <Button tabIndex={2}>stays</Button>
          <Button tabIndex={3}>inside</Button>
          <Button tabIndex={4}>the modal</Button>
        </Modal>
      </Wrapper>
    );
  }
}

export default ModalDemo;
