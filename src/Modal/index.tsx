import React, { Component } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import Modal from 'react-modal';
import styled from 'styled-components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

interface State {
  modalIsOpen: boolean;
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

const Wrapper = styled.div`
  align-items: center;
  background: #ccc repeating-linear-gradient(45deg, #ccc, #ccc 10px, #eee 10px, #eee 20px);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding: 10px;
  width: 100vw;
`;

const Heading = styled.h1`
  margin: 0;
  text-align: center;
`;

const SubHeading = styled.h3`
  text-align: center;

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const Input = styled.input`
  border: 1px solid #f04;
  line-height: 1;
  padding: 6px;
  width: 120px;

  + button {
    margin-left: 15px;
  }
`;

const Button = styled.button`
  background-color: #f04;
  color: #fff;
  margin-bottom: 16px;
  padding: 8px;

  + button {
    margin-left: 15px;
  }
`;

export default class ModalDemo extends Component<any, State> {
  public state = {
    modalIsOpen: false,
    run: false,
    stepIndex: 0,
    steps: [
      {
        content: "Here's an input inside a modal that can be used through the spotlight",
        placement: 'bottom',
        target: '.ReactModal__Content input',
        textAlign: 'center',
        spotlightClicks: true,
      },
      {
        content: 'Tabs or spaces? 🤔',
        placement: 'bottom',
        target: '.ReactModal__Content button:nth-of-type(1)',
        textAlign: 'center',
      },
      {
        content: "A button! That's rare on the web",
        placement: 'bottom',
        target: '.ReactModal__Content button:nth-of-type(2)',
      },
      {
        content: "Sometimes I wonder what's inside my mind",
        placement: 'bottom',
        target: '.ReactModal__Content button:nth-of-type(3)',
      },
      {
        content: 'Modal, Portal, Quintal!',
        placement: 'bottom',
        target: '.ReactModal__Content button:nth-of-type(4)',
      },
    ] as Step[],
  };

  public componentDidMount() {
    a11yChecker();
  }

  public componentDidUpdate(prevProps: any, prevState: State) {
    if (!prevState.modalIsOpen && this.state.modalIsOpen) {
      this.start();
    }
  }

  private start = () => {
    this.setState({
      run: true,
    });
  };

  private handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      this.setState({ run: false });
    }

    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  };

  private openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  private closeModal = () => {
    this.setState({
      modalIsOpen: false,
      run: false,
    });
  };

  private afterOpenModal = () => {
    this.setState({
      run: true,
    });
  };

  public render() {
    const { modalIsOpen, run, steps } = this.state;

    const customStyles = {
      content: {
        maxHeight: '70%',
        textAlign: 'center' as const,
      },
    };

    return (
      <Wrapper>
        <Joyride
          callback={this.handleJoyrideCallback}
          continuous={true}
          run={run}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              arrowColor: '#ff0044',
              backgroundColor: '#ff0044',
              overlayColor: 'rgba(255, 0, 68, 0.2)',
              primaryColor: '#000',
              textColor: '#fff',
            },
          }}
        />
        <Heading>It works with modals</Heading>
        <SubHeading>
          (using{' '}
          <a
            href="https://github.com/reactjs/react-modal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open react-modal in a new window"
          >
            react-modal
          </a>
          )
        </SubHeading>
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
          <Input name="test" type="text" />
          <Button tabIndex={1}>tab navigation</Button>
          <Button tabIndex={2}>stays</Button>
          <Button tabIndex={3}>inside</Button>
          <Button tabIndex={4}>the modal</Button>
        </Modal>
      </Wrapper>
    );
  }
}
