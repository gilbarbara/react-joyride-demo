import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMount } from 'react-use';
import { Box, Button, FlexCenter, H2, Loader } from '@gilbarbara/components';

import { useAppContext } from '../context';

export default function RouteA() {
  const [showLoader, setLoader] = useState(true);
  const {
    setState,
    state: { tourActive },
  } = useAppContext();

  useMount(() => {
    if (tourActive) {
      setTimeout(() => {
        setLoader(false);
        setState({ run: true, stepIndex: 2 });
      }, 600);
    }
  });

  return (
    <Box>
      <H2 align="center" color="purple">
        <span id="routeB">Route B</span>
      </H2>
      {tourActive && showLoader && (
        <FlexCenter height={100}>
          <Loader color="purple" size={100} />
        </FlexCenter>
      )}
      <FlexCenter padding="xl">
        <Link to="/multi-route">
          <Button bg="gray.600">Back to Home</Button>
        </Link>
      </FlexCenter>
    </Box>
  );
}
