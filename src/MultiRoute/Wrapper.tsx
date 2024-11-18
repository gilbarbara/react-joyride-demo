import Joyride, { CallBackProps, EVENTS } from 'react-joyride';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { Page, Paragraph, theme } from '@gilbarbara/components';

import { useAppContext } from './context';
import Header from './Header';

export default function MultiRouteWrapper() {
  const {
    setState,
    state: { run, stepIndex, steps },
  } = useAppContext();
  const navigate = useNavigate();

  useMount(() => {
    setState({
      steps: [
        {
          target: '#home',
          content: (
            <>
              <Paragraph bold size="lg">
                This is the home page
              </Paragraph>
              <Paragraph>
                When you click "next", it will stop the tour, navigate to route A, and continue the
                tour.
              </Paragraph>
            </>
          ),
          data: {
            next: '/multi-route/a',
          },
          disableBeacon: true,
        },
        {
          target: '#routeA',
          content: (
            <>
              <Paragraph bold size="lg">
                This is Route A
              </Paragraph>
              <Paragraph>
                The loader that appeared in the page was a simulation of a real page load, and now
                the tour is active again
              </Paragraph>
            </>
          ),
          data: {
            previous: '/multi-route',
            next: '/multi-route/b',
          },
          disableBeacon: true,
        },
        {
          target: '#routeB',
          content: (
            <>
              <Paragraph bold size="lg">
                This is Route B
              </Paragraph>
              <Paragraph>
                Yet another loader simulation and now we reached the last step in our tour!
              </Paragraph>
            </>
          ),
          data: {
            previous: '/multi-route/a',
            next: '/multi-route',
          },
          disableBeacon: true,
        },
      ],
    });
  });

  const handleCallback = (data: CallBackProps) => {
    const {
      action,
      index,
      step: {
        data: { next, previous },
      },
      type,
    } = data;
    const isPreviousAction = action === 'prev';

    if (type === EVENTS.STEP_AFTER) {
      if (index < 2) {
        setState({ run: false });
        navigate(isPreviousAction && previous ? previous : next);
      }

      if (index === 2) {
        if (isPreviousAction && previous) {
          setState({ run: false });
          navigate(previous);
        } else {
          setState({ run: false, stepIndex: 0, tourActive: false });
        }
      }
    }
  };

  return (
    <Page>
      <Header />
      <Outlet />
      <Joyride
        callback={handleCallback}
        continuous
        run={run}
        stepIndex={stepIndex}
        steps={steps}
        styles={{
          options: {
            arrowColor: theme.black,
            backgroundColor: theme.black,
            primaryColor: theme.colors.purple,
            textColor: theme.white,
          },
        }}
      />
    </Page>
  );
}
