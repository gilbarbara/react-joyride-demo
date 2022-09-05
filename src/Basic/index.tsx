import React from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useMount, useSetState } from 'react-use';
import { Box, BoxCenter, BoxProps, Button, Divider, H2, Paragraph } from '@gilbarbara/components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

import Logo from '../components/Logo';
import StarBurst from '../components/StarBurst';
import { logGroup } from '../modules/helpers';

interface Props {
  breakpoint: string;
}

interface State {
  run: boolean;
  steps: Step[];
}

function Section(props: BoxProps) {
  return <BoxCenter color="#fff" height="100vh" px="md" py="xl" {...props} />;
}

export default function BasicDemo(props: Props) {
  const { breakpoint } = props;
  const [{ run, steps }, setState] = useSetState<State>({
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
              height="50px"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 96 96"
              width="50px"
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
        placement: 'left',
        target: '.demo__about h2',
      },
    ],
  });

  useMount(() => {
    a11yChecker();
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }

    logGroup(type, data);
  };

  return (
    <Box minHeight="90vh">
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <Section className="demo__hero" variant="red">
        <Box align="center" colorVariant="white" direction="column" display="flex" maxWidth={600}>
          <StarBurst className="star-burst">V2</StarBurst>
          <Logo aria-hidden breakpoint={breakpoint} />
          <Paragraph align="center" style={{ fontSize: breakpoint === 'lg' ? 32 : 18 }}>
            Create guided tours for your apps
          </Paragraph>
          <Divider mb="xl" variant="white" />
          <Button onClick={handleClickStart} size="lg" variant="white">
            Start
          </Button>
        </Box>
      </Section>
      <Section className="demo__projects" justify="start" variant="orange">
        <H2>OUR PROJECTS</H2>
      </Section>
      <Section className="demo__how-it-works" justify="start" variant="green">
        <H2>HOW DOES IT WORK</H2>
      </Section>
      <Section className="demo__about" justify="start" variant="blue">
        <H2>ABOUT US</H2>
      </Section>
    </Box>
  );
}
