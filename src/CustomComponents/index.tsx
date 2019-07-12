import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import styled, { keyframes } from 'styled-components';
import Joyride, {
  BeaconRenderProps,
  CallBackProps,
  Step,
  StoreHelpers,
  TooltipRenderProps,
  STATUS,
} from 'react-joyride';
import Select from 'react-select';
// @ts-ignore
import a11yChecker from 'a11y-checker';

import Icon from './Icon';
import Intl from './Intl';
import Grid from './Grid';

interface Props {
  setLocale: (locale: string) => void;
}

interface State {
  run: boolean;
  steps: Step[];
}

interface IntlProps {
  children: React.ReactNode;
  locale: string;
}

const Wrapper = styled.div`
  background-color: #ccc;
  box-sizing: border-box;
  min-height: 100vh;
  padding: 20px 0 70px;
  position: relative;
`;

const Heading = styled.h1`
  margin: 0;
  text-align: center;
`;

const SubHeading = styled.h3`
  color: #f04;
  text-align: center;

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const Row = styled.div`
  align-items: center;
  display: flex;
  white-space: nowrap;
`;

const Button = styled.button`
  background-color: #f04;
  color: #fff;
  margin-right: ${(props: { spacer?: boolean }) => (props.spacer ? 'auto' : 0)};
  padding: 1.1rem;
`;

const Input = styled.input`
  -webkit-appearance: none;
  border: 0.1rem solid #f04;
  padding: 0.6rem;
  width: 75%;
`;

const TooltipBody = styled.div`
  background-color: #fff;
  min-width: 290px;
  max-width: 420px;
  position: relative;
`;

const TooltipContent = styled.div`
  color: #000;
  padding: 20px;
`;

const TooltipTitle = styled.h2`
  color: #f04;
  padding: 20px;
  margin: 0;
`;

const TooltipFooter = styled.div`
  background-color: #ffccda;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  padding: 5px;

  * + * {
    margin-left: 0.5rem;
  }

  ${Button} {
    padding: 0.8rem;
  }
`;

const Tooltip = ({
  continuous,
  index,
  isLastStep,
  step,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) => {
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
  );
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

const BeaconButton = styled.button`
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

const IntlWrapper = ({ children, locale }: IntlProps) => <Intl locale={locale}>{children}</Intl>;

class Custom extends React.Component<Props, State> {
  public static contextTypes = {
    intl: intlShape,
  };

  public state = {
    run: true,
    steps: [
      {
        content: (
          <React.Fragment>
            <h5 style={{ marginTop: 0 }}>Weekly magic on your inbox</h5>
            <Row>
              <Input type="email" placeholder="Type your email" />
              <Button>SEND</Button>
            </Row>
          </React.Fragment>
        ),
        placementBeacon: 'top' as 'top',
        target: '.image-grid div:nth-child(1)',
        textAlign: 'center',
        title: 'Our awesome projects',
      },
      {
        content: 'Change the world, obviously',
        disableCloseOnEsc: true,
        disableOverlayClicks: true,
        target: '.image-grid div:nth-child(2)',
        title: 'Our Mission',
      },
      {
        content: 'Special stuff just for you!',
        placement: 'top' as 'top',
        target: '.image-grid div:nth-child(4)',
        title: 'The good stuff',
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
        placement: 'right' as 'right',
        target: '.image-grid div:nth-child(5)',
        title: 'We are the people',
      },
    ],
  };

  private helpers?: StoreHelpers;

  public componentDidMount() {
    a11yChecker();
  }

  private setHelpers = (helpers: StoreHelpers) => {
    this.helpers = helpers;
  };

  private handleClickRestart = () => {
    const { reset }: StoreHelpers = this.helpers!;

    reset(true);
  };

  private handleSelect = (option: { value: string }) => {
    const { setLocale } = this.props;
    setLocale(option.value);
  };

  private handleJoyrideCallback = (props: CallBackProps) => {
    const { status, type } = props;
    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (options.includes(status)) {
      this.setState({ run: false });
    }

    // tslint:disable:no-console
    console.groupCollapsed(type);
    console.log(props);
    console.groupEnd();
    // tslint:enable:no-console
  };

  public render() {
    const { run, steps } = this.state;
    const {
      intl: { messages },
    } = this.context;

    return (
      <Wrapper>
        <Heading>You can use custom components!</Heading>
        <SubHeading>
          (using{' '}
          <a
            href="https://github.com/styled-components/styled-components"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open styled-components in a new window"
          >
            styled-components
          </a>
          )
        </SubHeading>
        <Selector>
          <Select
            // @ts-ignore
            placeholder={
              <Option>
                <Icon /> Select your language
              </Option>
            }
            // @ts-ignore
            onChange={this.handleSelect}
            options={[
              {
                label: (
                  <Option>
                    <Icon /> English
                  </Option>
                ),
                value: 'en',
              },
              {
                label: (
                  <Option>
                    <Icon /> Español
                  </Option>
                ),
                value: 'es',
              },
              {
                label: (
                  <Option>
                    <Icon /> Deutsch
                  </Option>
                ),
                value: 'de',
              },
              {
                label: (
                  <Option>
                    <Icon /> Français
                  </Option>
                ),
                value: 'fr',
              },
            ]}
          />
          <button onClick={this.handleClickRestart}>
            <FormattedMessage id="restart" />
          </button>
        </Selector>
        <Joyride
          run={run}
          steps={steps}
          beaconComponent={BeaconButton as React.ElementType<BeaconRenderProps>}
          callback={this.handleJoyrideCallback}
          getHelpers={this.setHelpers}
          locale={messages}
          scrollToFirstStep={true}
          showSkipButton={true}
          tooltipComponent={Tooltip}
          styles={{
            options: {
              arrowColor: '#fff',
              zIndex: 2000000,
            },
            overlay: {
              backgroundColor: 'rgba(79, 46, 8, 0.5)',
            },
          }}
        />
        <Grid />
      </Wrapper>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
export default class CustomIntl extends React.Component<IntlProps> {
  public state = {
    locale: 'en',
  };

  private setLocale = (locale: string) => {
    this.setState({ locale });
  };

  public render() {
    const { locale } = this.state;

    return (
      <IntlWrapper locale={locale}>
        <Custom setLocale={this.setLocale} />
      </IntlWrapper>
    );
  }
}
