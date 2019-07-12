import React, { Component } from 'react';
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';
import styled from 'styled-components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

import { ReactComponent as LogoSVG } from '../media/logo.svg';
import StarBurst from '../components/StarBurst';

import './styles.css';

interface Props {
  breakpoint: string;
}

interface State {
  run: boolean;
  steps: Step[];
}

const Logo = styled(LogoSVG)`
  height: auto;
  margin-bottom: 10px;
  max-height: 100%;
  max-width: ${({ breakpoint }: Props) => `${breakpoint === 'lg' ? '500px' : '290px'}`};
  width: 100%;
`;

const Subtitle = styled.p`
  font-size: ${({ breakpoint }: Props) => `${breakpoint === 'lg' ? '35px' : '20px'}`};
  margin: 0 auto;
  width: 100%;
`;

class Basic extends Component<Props, State> {
  private helpers?: StoreHelpers;

  constructor(props: Props) {
    super(props);

    this.state = {
      run: false,
      steps: [
        {
          content: <h2>Let's begin our journey!</h2>,
          locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
          placement: 'center',
          target: 'body',
        },
        {
          content: <h2>Sticky elements</h2>,
          floaterProps: {
            disableAnimation: true,
          },
          spotlightPadding: 20,
          target: '.star-burst',
        },
        {
          content: 'These are our super awesome projects!',
          placement: 'bottom',
          styles: {
            options: {
              width: 300,
            },
          },
          target: '.demo__projects h2',
          title: 'Our projects',
        },
        {
          content: (
            <div>
              You can render anything!
              <br />
              <h3>Like this H3 title</h3>
            </div>
          ),
          placement: 'top',
          target: '.demo__how-it-works h2',
          title: 'Our Mission',
        },
        {
          content: (
            <div>
              <h3>All about us</h3>
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 96 96"
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
          placement: 'left',
          target: '.demo__about h2',
        },
      ],
    };
  }

  public componentDidMount() {
    a11yChecker();
  }

  private getHelpers = (helpers: StoreHelpers) => {
    this.helpers = helpers;
  };

  private handleClickStart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    this.setState({
      run: true,
    });
  };

  private handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      this.setState({ run: false });
    }

    // tslint:disable:no-console
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
    // tslint:enable:no-console
  };

  public render() {
    const { run, steps } = this.state;
    const { breakpoint } = this.props;

    return (
      <div className="demo-wrapper">
        <Joyride
          callback={this.handleJoyrideCallback}
          continuous={true}
          getHelpers={this.getHelpers}
          run={run}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
        <div className="demo__section demo__hero">
          <div>
            <StarBurst className="star-burst">2.0</StarBurst>
            <Logo aria-hidden={true} breakpoint={breakpoint} />
            <Subtitle breakpoint={breakpoint}>Create guided tours for your apps</Subtitle>
            <button onClick={this.handleClickStart}>Start</button>
          </div>
        </div>
        <div className="demo__section demo__projects">
          <h2>OUR PROJECTS</h2>
        </div>
        <div className="demo__section demo__how-it-works">
          <h2>HOW DOES IT WORK</h2>
        </div>
        <div className="demo__section demo__about">
          <h2>ABOUT US</h2>
        </div>
      </div>
    );
  }
}

export default Basic;
