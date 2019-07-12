import React, { Component } from 'react';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// @ts-ignore
import a11yChecker from 'a11y-checker';

import { grommet } from 'grommet/themes';
import { Box, Button, Grommet, Heading } from 'grommet';
// @ts-ignore
import Menu from 'react-burger-menu/lib/menus/push';

import { ReactComponent as Times } from '../media/times.svg';
import { ReactComponent as MenuIcon } from '../media/menu.svg';

import Growth from './Growth';
import Calendar from './Calendar';
import Connections from './Connections';
import Users from './Users';

interface State {
  run: boolean;
  sidebarOpen: boolean;
  steps: Step[];
  stepIndex: number;
}

interface StateChange {
  isOpen: boolean;
}

const Wrapper = styled(Grommet)`
  background-color: #3c3f41;
  color: #fff;
  padding-bottom: 50px;
  height: auto;
  // overflow: initial;
`;

const Main = styled(Box)`
  margin: 0 auto;
  max-width: 1280px;
  padding: 15px;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const GridBox = styled(Box)`
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Hamburger = styled(Button).attrs({
  role: 'menu',
})`
  left: 15px;
  position: absolute;
  top: 15px;

  @media (min-width: 768px) {
    left: 30px;
  }
`;

class Controlled extends Component<any, State> {
  public state = {
    run: false,
    sidebarOpen: false,
    stepIndex: 0,
    steps: [],
  };

  private calendar?: HTMLElement;
  private connections?: HTMLElement;
  private growth?: HTMLElement;
  private menu?: HTMLElement;
  private sidebar?: HTMLElement;
  private users?: HTMLElement;

  public componentDidMount() {
    this.setState(
      {
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
            target: this.menu!,
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
            target: this.sidebar!,
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
            target: this.calendar!,
            title: 'The schedule',
          },
          {
            content: <div>Our rate is off the charts!</div>,
            placement: 'bottom',
            spotlightClicks: true,
            target: this.growth!,
            title: 'Our Growth',
          },
          {
            content: (
              <div>
                <svg
                  width="96px"
                  height="96px"
                  viewBox="0 0 96 96"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  aria-hidden="true"
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
            target: this.users!,
            title: 'Our Users',
          },
          {
            content: 'The awesome connections you have made',
            placement: 'top',
            target: this.connections!,
          },
        ],
      },
      () => {
        a11yChecker();
      },
    );
  }

  private handleJoyrideCallback = (data: CallBackProps) => {
    const { sidebarOpen } = this.state;
    const { action, index, type, status } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false, stepIndex: 0 });
    } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      if (sidebarOpen && index === 0) {
        setTimeout(() => {
          this.setState({ run: true });
        }, 400);
      } else if (sidebarOpen && index === 1) {
        this.setState(
          {
            run: false,
            sidebarOpen: false,
            stepIndex,
          },
          () => {
            setTimeout(() => {
              this.setState({ run: true });
            }, 400);
          },
        );
      } else if (index === 2 && action === ACTIONS.PREV) {
        this.setState(
          {
            run: false,
            sidebarOpen: true,
            stepIndex,
          },
          () => {
            setTimeout(() => {
              this.setState({ run: true });
            }, 400);
          },
        );
      } else {
        // Update state to advance the tour
        this.setState({
          sidebarOpen: false,
          stepIndex,
        });
      }
    }

    // tslint:disable:no-console
    console.groupCollapsed(type === EVENTS.TOUR_STATUS ? `${type}:${status}` : type);
    console.log(data);
    console.groupEnd();
    // tslint:enable:no-console
  };

  private handleClickOpen = () => {
    const { run, sidebarOpen, stepIndex } = this.state;

    this.setState({
      run: stepIndex === 0 ? false : run,
      sidebarOpen: !sidebarOpen,
      stepIndex: stepIndex === 0 ? 1 : stepIndex,
    });
  };

  private handleStateChange = ({ isOpen }: StateChange) => {
    this.setState({ sidebarOpen: isOpen });
  };

  private setRef = (el: any) => {
    if (el instanceof HTMLElement) {
      const { dataset } = el;

      if (dataset.name === 'calendar') {
        this.calendar = el;
      }

      if (dataset.name === 'connections') {
        this.connections = el;
      }

      if (dataset.name === 'growth') {
        this.growth = el;
      }

      if (dataset.name === 'menu') {
        this.menu = el;
      }

      if (dataset.name === 'sidebar') {
        this.sidebar = el;
      }

      if (dataset.name === 'users') {
        this.users = el;
      }
    }
  };

  public render() {
    const { run, sidebarOpen, steps, stepIndex } = this.state;

    return (
      <Wrapper theme={grommet} full={true} id="outerContainer">
        <Joyride
          continuous={true}
          run={run}
          steps={steps}
          stepIndex={stepIndex}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          callback={this.handleJoyrideCallback}
        />
        <Menu
          width={240}
          pageWrapId="innerContainer"
          outerContainerId="outerContainer"
          isOpen={sidebarOpen}
          onStateChange={this.handleStateChange}
          customBurgerIcon={false}
          customCrossIcon={<Times color="#f04" />}
        >
          <Box background="white" fill={true} pad="medium" data-name="sidebar" ref={this.setRef}>
            <Box>
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
            </Box>
          </Box>
        </Menu>
        <Hamburger
          plain={true}
          onClick={this.handleClickOpen}
          a11yTitle="Menu"
          data-name="menu"
          ref={this.setRef}
        >
          <MenuIcon aria-hidden="true" color="#f04" width={32} />
        </Hamburger>
        <Main id="innerContainer" as="main">
          <Heading textAlign="center" style={{ marginTop: 0 }}>
            DASHBOARD
          </Heading>
          <Box direction="row" wrap={true}>
            <GridBox background="neutral-1" align="center" pad="medium">
              <Calendar setRef={this.setRef} />
            </GridBox>
            <GridBox background="neutral-2" align="center" pad="medium">
              <Growth setRef={this.setRef} />
            </GridBox>
            <GridBox background="neutral-3" align="center" pad="medium">
              <Users setRef={this.setRef} />
            </GridBox>
            <GridBox background="neutral-4" align="center" pad="medium">
              <Connections setRef={this.setRef} />
            </GridBox>
          </Box>
        </Main>
      </Wrapper>
    );
  }
}

export default Controlled;
