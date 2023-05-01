import { useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import Modal from 'react-modal';
import { useMount, usePrevious, useSetState } from 'react-use';
import { Anchor, Button, H1, H2, Input, Page, Spacer, theme } from '@gilbarbara/components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

import { logGroup } from '../modules/helpers';

interface State {
  modalIsOpen: boolean;
  run: boolean;
  steps: Step[];
}

export default function ModalDemo() {
  const [{ modalIsOpen, run, steps }, setState] = useSetState<State>({
    modalIsOpen: false,
    run: false,
    steps: [
      {
        content: "Here's an input inside a modal that can be used through the spotlight",
        placement: 'bottom',
        target: '.ReactModal__Content [data-component-name="SpacerItem"]:nth-of-type(1) input',
        textAlign: 'center',
        spotlightClicks: true,
      },
      {
        content: 'Tabs or spaces? 🤔',
        placement: 'bottom',
        target: '.ReactModal__Content [data-component-name="SpacerItem"]:nth-of-type(2) button',
        textAlign: 'center',
      },
      {
        content: "A button! That's rare on the web",
        placement: 'bottom',
        target: '.ReactModal__Content [data-component-name="SpacerItem"]:nth-of-type(3) button',
      },
      {
        content: "Sometimes I wonder what's inside my mind",
        placement: 'bottom',
        target: '.ReactModal__Content [data-component-name="SpacerItem"]:nth-of-type(4) button',
      },
      {
        content: 'Modal, Portal, Quintal!',
        placement: 'bottom',
        target: '.ReactModal__Content [data-component-name="SpacerItem"]:nth-of-type(5) button',
      },
    ] as Step[],
  });
  const previousModalIsOpen = usePrevious(modalIsOpen);

  useMount(() => {
    a11yChecker();
  });

  useEffect(() => {
    if (!previousModalIsOpen && modalIsOpen) {
      setState({
        run: true,
      });
    }
  });

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setState({ run: false });
    }

    logGroup(type, data);
  };

  const openModal = () => {
    setState({
      modalIsOpen: true,
    });
  };

  const closeModal = () => {
    setState({
      modalIsOpen: false,
      run: false,
    });
  };

  const afterOpenModal = () => {
    setState({
      run: true,
    });
  };

  const customStyles = {
    content: {
      maxHeight: '70%',
      textAlign: 'center' as const,
    },
  };

  return (
    <Page centered shade="lighter" variant="green">
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={run}
        showSkipButton
        steps={steps}
        styles={{
          options: {
            arrowColor: theme.variants.green.lighter.bg,
            backgroundColor: theme.variants.green.lighter.bg,
            primaryColor: theme.colors.green,
            textColor: '#000',
          },
        }}
      />
      <H1 mb={0}>It works with modals</H1>
      <H2>
        (using{' '}
        <Anchor
          aria-label="Open react-modal in a new window"
          external
          href="https://github.com/reactjs/react-modal"
          variant="green"
        >
          react-modal
        </Anchor>
        )
      </H2>
      <Button onClick={openModal} variant="green">
        Open Modal
      </Button>
      <Modal
        ariaHideApp={false}
        contentLabel="Example Modal"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>A react-modal example</h2>
        <p>I am a modal</p>
        <Spacer distribution="center">
          <Input name="test" type="text" />
          <Button tabIndex={0} variant="green">
            tab navigation
          </Button>
          <Button tabIndex={0} variant="green">
            stays
          </Button>
          <Button tabIndex={0} variant="green">
            inside
          </Button>
          <Button tabIndex={0} variant="green">
            the modal
          </Button>
        </Spacer>
      </Modal>
    </Page>
  );
}
