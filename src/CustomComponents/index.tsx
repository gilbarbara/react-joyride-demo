import React, { forwardRef, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Joyride, {
  BeaconRenderProps,
  CallBackProps,
  STATUS,
  Step,
  StoreHelpers,
  TooltipRenderProps,
} from 'react-joyride';
import { useMount, useSetState } from 'react-use';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dropdown,
  H1,
  H3,
  Icon,
  Input,
  Page,
  Spacer,
  theme,
  Types,
} from '@gilbarbara/components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

import Grid from './Grid';
import Intl, { messages } from './Intl';

import { logGroup } from '../modules/helpers';

interface Props {
  locale: string;
  setLocale: (locale: string) => void;
}

interface State {
  complete: boolean;
  run: boolean;
  steps: Step[];
}

interface IntlProps {
  children: React.ReactNode;
  locale: string;
}

const variant = theme.variants.primary;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  55% {
    background-color: rgba(48, 48, 232, 0.9);
    transform: scale(1.6);
  }
`;

const languageOptions: Types.DropdownOption[] = [
  {
    prefix: <Icon name="globe-alt" />,
    label: 'English',
    value: 'en',
  },
  {
    prefix: <Icon name="globe-alt" />,
    label: 'Español',
    value: 'es',
  },
  {
    prefix: <Icon name="globe-alt" />,
    label: 'Deutsch',
    value: 'de',
  },
  {
    prefix: <Icon name="globe-alt" />,
    label: 'Français',
    value: 'fr',
  },
  {
    prefix: <Icon name="globe-alt" />,
    label: 'Português',
    value: 'pt',
  },
];

const BeaconButton = styled.button`
  animation: ${pulse} 1s ease-in-out infinite;
  background-color: rgba(48, 48, 232, 0.6);
  border: 0;
  border-radius: 50%;
  display: inline-block;
  height: 3rem;
  width: 3rem;
`;

const BeaconComponent = forwardRef<HTMLButtonElement, BeaconRenderProps>((props, ref) => {
  return <BeaconButton ref={ref} {...props} />;
});

function IntlWrapper({ children, locale }: IntlProps) {
  return <Intl locale={locale}>{children}</Intl>;
}

function Tooltip({
  backProps,
  continuous,
  index,
  isLastStep,
  primaryProps,
  skipProps,
  step,
  tooltipProps,
}: TooltipRenderProps) {
  return (
    <Box
      {...tooltipProps}
      border={false}
      maxWidth={420}
      minWidth={290}
      overflow="hidden"
      radius="md"
      variant="white"
    >
      <Box padding="md">
        {step.title && (
          <H3 mb="md" variant="primary">
            {step.title}
          </H3>
        )}
        {step.content && <Box>{step.content}</Box>}
      </Box>
      <Box padding="xs" shade="lightest" variant="primary">
        <Spacer distribution="space-between">
          {!isLastStep && (
            <Button {...skipProps} size="sm">
              <FormattedMessage id="skip" />
            </Button>
          )}
          <Spacer>
            {index > 0 && (
              <Button {...backProps} size="sm">
                <FormattedMessage id="back" />
              </Button>
            )}
            <Button {...primaryProps} size="sm">
              <FormattedMessage id={continuous ? 'next' : 'close'} />
            </Button>
          </Spacer>
        </Spacer>
      </Box>
    </Box>
  );
}

function Custom(props: Props) {
  const { locale, setLocale } = props;
  const [{ complete, run, steps }, setState] = useSetState<State>({
    complete: false,
    run: true,
    steps: [
      {
        content: (
          <React.Fragment>
            <h5 style={{ marginTop: 0 }}>Weekly magic on your inbox</h5>
            <Spacer>
              <Input name="email" placeholder="Type your email" type="email" />
              <Button>SEND</Button>
            </Spacer>
          </React.Fragment>
        ),
        placementBeacon: 'top' as const,
        target: '.image-grid div:nth-child(1)',
        title: 'Our awesome projects',
      },
      {
        content: 'Change the world, obviously',
        disableCloseOnEsc: true,
        disableOverlay: true,
        target: '.image-grid div:nth-child(2)',
        title: 'Our Mission',
      },
      {
        content: 'Special stuff just for you!',
        placement: 'top' as const,
        styles: {
          options: {
            arrowColor: variant.lightest.bg,
          },
        },
        target: '.image-grid div:nth-child(4)',
        title: 'The good stuff',
      },
      {
        content: (
          <div>
            <svg
              height="96px"
              preserveAspectRatio="xMidYMid"
              role="img"
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
        placement: 'right' as const,
        target: '.image-grid div:nth-child(5)',
        title: 'We are the people',
      },
    ],
  });
  const helpers = useRef<StoreHelpers>();

  useMount(() => {
    a11yChecker();
  });

  const setHelpers = (storeHelpers: StoreHelpers) => {
    helpers.current = storeHelpers;
  };

  const handleClickRestart = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { reset } = helpers.current!;

    setState({ complete: false });
    reset(true);
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (options.includes(status)) {
      setState({ complete: true, run: false });
    }

    logGroup(type, data);
  };

  const handleSelect = (options: Types.DropdownOption[]) => {
    const [selected] = options;

    setLocale(`${selected.value}`);
  };

  return (
    <Page>
      <FormattedMessage id="title">
        {value => (
          <H1 align="center" mb={0}>
            {value}
          </H1>
        )}
      </FormattedMessage>
      <Spacer direction="vertical" distribution="center" my="md">
        <Dropdown
          items={languageOptions}
          onChange={handleSelect}
          placeholder="Select your language"
          values={languageOptions.filter(d => d.value === locale)}
        />
        {complete && (
          <Button onClick={handleClickRestart} size="sm">
            <FormattedMessage id="restart" />
          </Button>
        )}
      </Spacer>
      <Joyride
        beaconComponent={BeaconComponent}
        callback={handleJoyrideCallback}
        getHelpers={setHelpers}
        locale={messages}
        run={run}
        scrollToFirstStep
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 2000000,
          },
          overlay: {
            backgroundColor: 'rgba(79, 46, 8, 0.5)',
          },
        }}
        tooltipComponent={Tooltip}
      />
      <Grid />
    </Page>
  );
}

export default function CustomIntl() {
  const [locale, setLocale] = useState('en');

  return (
    <IntlWrapper locale={locale}>
      <Custom locale={locale} setLocale={setLocale} />
    </IntlWrapper>
  );
}
