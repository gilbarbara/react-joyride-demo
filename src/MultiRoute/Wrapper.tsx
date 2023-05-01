import Joyride, { CallBackProps } from 'react-joyride';
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
              <Paragraph bold size="large">
                This is the home page
              </Paragraph>
              <Paragraph>
                When you click "next", it will stop the tour, navigate to route A, and continue the
                tour.
              </Paragraph>
            </>
          ),
          disableBeacon: true,
        },
        {
          target: '#routeA',
          content: (
            <>
              <Paragraph bold size="large">
                This is Route A
              </Paragraph>
              <Paragraph>
                The loader that appeared in the page was a simulation of a real page load, and now
                the tour is active again
              </Paragraph>
            </>
          ),
        },
        {
          target: '#routeB',
          content: (
            <>
              <Paragraph bold size="large">
                This is Route B
              </Paragraph>
              <Paragraph>
                Yet another loader simulation and now we reached the last step in our tour!
              </Paragraph>
            </>
          ),
        },
      ],
    });
  });

  const handleCallback = (data: CallBackProps) => {
    const { action, index, lifecycle, type } = data;

    if (type === 'step:after' && index === 0 /* or step.target === '#home' */) {
      setState({ run: false });

      navigate('/multi-route/a');
    } else if (type === 'step:after' && index === 1) {
      if (action === 'next') {
        setState({ run: false });
        navigate('/multi-route/b');
      } else {
        navigate('/multi-route');
        setState({ run: true, stepIndex: 0 });
      }
    } else if (type === 'step:after' && action === 'prev' && index === 2) {
      setState({ run: false });

      navigate('/multi-route/a');
    } else if (action === 'reset' || lifecycle === 'complete') {
      setState({ run: false, stepIndex: 0, tourActive: false });
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
