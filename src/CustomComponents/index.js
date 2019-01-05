import * as React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import styled, { keyframes } from 'styled-components';
import ReactJoyride, { STATUS } from 'react-joyride';
import Select from 'react-select';
import a11yChecker from 'a11y-checker';

import Icon from './Icon';
import Intl from './Intl';
import Grid from './Grid';

const Wrapper = styled.div`
  background-color: #ccc;
  box-sizing: border-box;
  min-height: 100vh;
	padding-bottom: 50px;
	position: relative;
`;

const TooltipBody = styled.div`
  background-color: #daa588;
  min-width: 290px;
  max-width: 420px;
  position: relative;
`;

const TooltipContent = styled.div`
  color: #fff;
  padding: 20px;
`;

const TooltipTitle = styled.h2`
  color: #fff;
  padding: 20px;
  margin: 0;
`;

const TooltipFooter = styled.div`
  background-color: #f56960;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  padding: 5px;

  * + * {
    margin-left: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: #e11b0e;
  color: #fff;
  margin-right: ${props => props.spacer ? 'auto' : 0};
`;

const Input = styled.input`
  padding: 1.2rem;
  width: 75%;
`;

const Tooltip = ({
  continuous,
  index,
  isLastStep,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps
}) => {
  return (
    <TooltipBody {...tooltipProps}>
      {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
      {step.content && <TooltipContent>{step.content}</TooltipContent>}
      <TooltipFooter>
        {!isLastStep && (
          <Button {...skipProps} spacer={true}>
            <FormattedMessage id="skip" />
          </Button>
        )}
        {index > 0 && (
          <Button {...backProps}>
            <FormattedMessage id="back" />
          </Button>
        )}
        <Button {...primaryProps}>
          <FormattedMessage id={continuous ? 'next' : 'close'} />
        </Button>
      </TooltipFooter>
    </TooltipBody>
  )
};

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  55% {
    background-color: rgba(255, 100, 100, 0.9);
    transform: scale(1.6);
  }
`;

const Beacon = styled.button`
  animation: ${pulse} 1s ease-in-out infinite;
  background-color: rgba(255, 27, 14, 0.6);
  border-radius: 50%;
  display: inline-block;
  height: 3rem;
  width: 3rem;
`;

const Selector = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-top: 15px;
  text-align: center;
  width: 250px;
`;

const Option = styled.div`
  align-items: center;
  display: flex;
  
  svg {
    margin-right: 8px;
  }
`;

const IntlWrapper = ({ children, locale }) => (
  <Intl locale={locale}>{children}</Intl>
);

class Custom extends React.Component {
  state = {
    run: true,
    steps: [
      {
        content: (
          <div>
            <h5 style={{ marginTop: 0 }}>Weekly magic on your inbox</h5>
            <Input type="email" placeholder="Type your email" />
            <Button>SEND</Button>
          </div>
        ),
        placement: 'bottom',
        placementBeacon: 'top',
        target: '.image-grid div:nth-child(1)',
        textAlign: 'center',
        title: 'Our awesome projects',
      },
      {
        content: 'Change the world, obviously',
        disableCloseOnEsc: true,
        disableOverlayClicks: true,
        placement: 'bottom',
        target: '.image-grid div:nth-child(2)',
        title: 'Our Mission'
      },
      {
        content: 'Special stuff just for you!',
        placement: 'top',
        target: '.image-grid div:nth-child(4)',
        title: 'The good stuff'
      },
      {
        content: (
          <div>
            <svg
              width="96px"
              height="96px"
              viewBox="0 0 96 96"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              role="img"
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
        target: '.image-grid div:nth-child(5)',
        placement: 'right',
        title: 'We are the people',
      }
    ]
  };
  helpers = {};

  static contextTypes = {
    intl: intlShape
  };

  componentDidMount() {
    a11yChecker();
  }

  setHelpers = (helpers) => {
    this.helpers = helpers;
  };

  handleClickRestart = () => {
    this.helpers.reset(true);
  };

  handleSelect = (option) => {
    const { setLocale } = this.props;
    setLocale(option.value);
  };

  handleJoyrideCallback = data => {
    const { status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ run: false });
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  render() {
    const { run, steps } = this.state;
    const { intl: { messages } } = this.context;

    return (
      <Wrapper>
        <Selector>
          <Select
            placeholder={<Option><Icon /> Select your language</Option>}
            onChange={this.handleSelect}
            options={[
              { value: 'en', label: <Option><Icon /> English</Option> },
              { value: 'es', label: <Option><Icon /> Español</Option> },
              { value: 'de', label: <Option><Icon /> Deutsch</Option> },
              { value: 'fr', label: <Option><Icon /> Français</Option> },
            ]}
          />
          <button onClick={this.handleClickRestart}><FormattedMessage id="restart" /></button>
        </Selector>
        <ReactJoyride
          run={run}
          steps={steps}
          beaconComponent={Beacon}
          callback={this.handleJoyrideCallback}
          getHelpers={this.setHelpers}
          locale={messages}
          scrollToFirstStep
          showSkipButton
          tooltipComponent={Tooltip}
          styles={{
            options: {
              arrowColor: '#DAA588',
              zIndex: 2000000
            },
            overlay: {
              backgroundColor: 'rgba(79, 46, 8, 0.5)'
            }
          }}
          {...this.props.joyride}
        />
        <Grid />
      </Wrapper>
    );
  }
}

export default class CustomComponent extends React.Component {
  state = {
    locale: 'en',
  };

  setLocale = (locale) => {
    this.setState({ locale });
  };

  render() {
    const { locale } = this.state;

    return (
      <IntlWrapper locale={locale}>
        <Custom setLocale={this.setLocale} />
      </IntlWrapper>
    );
  }
}
