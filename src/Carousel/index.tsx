import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { Carousel } from 'react-responsive-carousel';
import { useMeasure, useMount, useSetState } from 'react-use';
import { Anchor, Box, BoxCenter, Button, H4, H5, Page, theme } from '@gilbarbara/components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

import { logGroup } from '../modules/helpers';

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

const isPortrait = window.innerHeight > window.innerWidth;
const imageHeight = isPortrait ? 700 : 300;
const imageWidth = 1000;
const ratio = imageHeight / imageWidth;

export default function CarouselDemo() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [{ run, stepIndex, steps }, setState] = useSetState<State>({
    run: false,
    stepIndex: 0,
    steps: [
      {
        content: (
          <>
            <H4 mb={0}>You can control external widgets</H4>
            <H5 mb={0}>
              (using{' '}
              <Anchor
                aria-label="Open react-modal in a new window"
                external
                href="https://github.com/leandrowd/react-responsive-carousel/"
              >
                react-responsive-carousel
              </Anchor>
              )
            </H5>
          </>
        ),
        disableBeacon: true,
        target: '.app__carousel',
      },
      {
        content: 'Black and white photos are really beautiful',
        target: '.app__carousel',
        title: 'Image Two',
      },
      {
        content: 'Also known as grayscale',
        target: '.app__carousel',
        title: 'Image Three',
      },
      {
        content: 'Desaturate, Obfuscate',
        target: '.app__carousel',
        title: 'Image Four',
      },
      {
        content: <H4>Dark days and lonely nights</H4>,
        target: '.app__carousel',
      },
    ],
  });

  useMount(() => {
    a11yChecker();
    setState({ run: true });
  });

  const handleClickReset = () => {
    setState({ run: true, stepIndex: 0 });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      // Update state to advance the tour
      setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false });
    }

    logGroup(type, data);
  };

  return (
    <Page shade="lighter" variant="red">
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={run}
        scrollToFirstStep
        showSkipButton
        stepIndex={stepIndex}
        steps={steps}
        styles={{
          options: {
            primaryColor: theme.colors.primary,
          },
        }}
      />
      <Box ref={ref} className="app__carousel" height={Math.floor(width * ratio)}>
        <Carousel
          selectedItem={stepIndex}
          showArrows={!run}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
        >
          <img
            alt="1"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?blue`}
            style={{ cursor: 'pointer' }}
          />
          <img
            alt="2"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}/?green`}
          />
          <img
            alt="3"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?red`}
          />
          <img
            alt="4"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?purple`}
          />
          <img
            alt="5"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?yellow`}
          />
        </Carousel>
      </Box>
      {!run && stepIndex > 0 && (
        <BoxCenter mt="xl">
          <Button onClick={handleClickReset}>Restart</Button>
        </BoxCenter>
      )}
    </Page>
  );
}
