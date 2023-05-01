/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef } from 'react';
import { push as Menu } from 'react-burger-menu';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { Link } from 'react-router-dom';
import { useMount, useSetState } from 'react-use';
import styled from '@emotion/styled';
import { Box, ButtonUnstyled, H1, Icon, Page, Spacer } from '@gilbarbara/components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

import Calendar from './Calendar';
import Connections from './Connections';
import Growth from './Growth';
import Users from './Users';

import { logGroup } from '../modules/helpers';

interface State {
  run: boolean;
  sidebarOpen: boolean;
  stepIndex: number;
  steps: Step[];
}

interface StateChange {
  isOpen: boolean;
}

const GridBox = styled(Box)`
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Hamburger = styled(ButtonUnstyled)`
  left: 16px;
  position: absolute;
  top: 16px;

  @media (min-width: 768px) {
    left: 32px;
    top: 32px;
  }
`;

export default function ControlledDemo() {
  const [{ run, sidebarOpen, stepIndex, steps }, setState] = useSetState<State>({
    run: false,
    sidebarOpen: false,
    stepIndex: 0,
    steps: [],
  });

  const calendar = useRef<HTMLDivElement>(null);
  const connections = useRef<HTMLDivElement>(null);
  const growth = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const users = useRef<HTMLDivElement>(null);

  useMount(() => {
    setState({
      run: true,
      steps: [
        {
          content: (
            <div>
              You can interact with your own components through the spotlight.
              <br />
              Click the menu above!
            </div>
          ),
          disableBeacon: true,
          disableOverlayClose: true,
          hideCloseButton: true,
          hideFooter: true,
          placement: 'bottom',
          spotlightClicks: true,
          styles: {
            options: {
              zIndex: 10000,
            },
          },
          target: menu.current!,
          title: 'Menu',
        },
        {
          content: 'This is our sidebar, you can find everything you need here',
          placement: 'right',
          spotlightPadding: 0,
          styles: {
            options: {
              zIndex: 10000,
            },
          },
          target: sidebar.current!,
          title: 'Sidebar',
        },
        {
          content: 'Check the availability of the team!',
          placement: 'bottom',
          styles: {
            options: {
              zIndex: 10000,
            },
          },
          target: calendar.current!,
          title: 'The schedule',
        },
        {
          content: <div>Our rate is off the charts!</div>,
          placement: 'bottom',
          spotlightClicks: true,
          target: growth.current!,
          title: 'Our Growth',
        },
        {
          content: (
            <div>
              <svg
                aria-hidden="true"
                height="96px"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 96 96"
                width="96px"
                xmlns="http://www.w3.org/2000/svg"
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
          placement: 'right',
          target: users.current!,
          title: 'Our Users',
        },
        {
          content: 'The awesome connections you have made',
          placement: 'top',
          target: connections.current!,
        },
      ],
    });

    a11yChecker();
  });

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false, stepIndex: 0 });
    } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      if (sidebarOpen && index === 0) {
        setTimeout(() => {
          setState({ run: true });
        }, 400);
      } else if (sidebarOpen && index === 1) {
        setState({
          run: false,
          sidebarOpen: false,
          stepIndex: nextStepIndex,
        });

        setTimeout(() => {
          setState({ run: true });
        }, 400);
      } else if (index === 2 && action === ACTIONS.PREV) {
        setState({
          run: false,
          sidebarOpen: true,
          stepIndex: nextStepIndex,
        });

        setTimeout(() => {
          setState({ run: true });
        }, 400);
      } else {
        // Update state to advance the tour
        setState({
          sidebarOpen: false,
          stepIndex: nextStepIndex,
        });
      }
    }

    logGroup(type === EVENTS.TOUR_STATUS ? `${type}:${status}` : type, data);
  };

  const handleClickOpen = () => {
    setState({
      run: stepIndex === 0 ? false : run,
      sidebarOpen: !sidebarOpen,
      stepIndex: stepIndex === 0 ? 1 : stepIndex,
    });
  };

  const handleStateChange = ({ isOpen }: StateChange) => {
    setState({ sidebarOpen: isOpen });
  };

  return (
    <Page shade="dark" variant="gray">
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        stepIndex={stepIndex}
        steps={steps}
      />
      <Menu
        customBurgerIcon={false}
        customCrossIcon={<Icon color="#f04" name="close" />}
        isOpen={sidebarOpen}
        onStateChange={handleStateChange}
        pageWrapId="innerContainer"
        styles={{
          bmOverlay: {
            backgroundColor: '#ff004433',
            left: '0',
            top: '0',
          },
          bmMenuWrap: {
            position: 'fixed',
            height: '100%',
            top: '0',
            left: '0',
          },
        }}
        width={240}
      >
        <Box ref={sidebar} fill padding="md" variant="white">
          <Spacer direction="vertical">
            <Link className="menu-item" to="/">
              Home
            </Link>
            <Link className="menu-item" to="/controlled">
              Controlled
            </Link>
            <Link className="menu-item" to="/custom">
              Custom
            </Link>
            <Link className="menu-item" to="/modal">
              Modal
            </Link>
            <Link className="menu-item" to="/scroll">
              Scroll
            </Link>
          </Spacer>
        </Box>
      </Menu>
      <Hamburger ref={menu} onClick={handleClickOpen}>
        <Icon aria-hidden="true" color="#f04" name="menu" size={32} />
      </Hamburger>
      <Box id="innerContainer">
        <H1 align="center">DASHBOARD</H1>
        <Box display="flex" wrap="wrap">
          <GridBox ref={calendar} padding="md" textAlign="center" variant="green">
            <Calendar />
          </GridBox>
          <GridBox ref={growth} padding="md" textAlign="center" variant="purple">
            <Growth />
          </GridBox>
          <GridBox ref={users} padding="md" textAlign="center" variant="blue">
            <Users />
          </GridBox>
          <GridBox ref={connections} padding="md" textAlign="center" variant="red">
            <Connections />
          </GridBox>
        </Box>
      </Box>
    </Page>
  );
}
