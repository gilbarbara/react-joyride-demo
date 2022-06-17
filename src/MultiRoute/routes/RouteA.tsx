import { useState } from 'react';
import { useMount } from 'react-use';
import { Box, BoxCenter, H2, Loader } from '@gilbarbara/components';

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
        setState({ run: true, stepIndex: 1 });
      }, 1200);
    }
  });

  return (
    <Box>
      <H2 align="center" variant="purple">
        <span id="routeA">Route A</span>
      </H2>
      {tourActive && showLoader && (
        <BoxCenter height={200}>
          <Loader size={100} variant="purple" />
        </BoxCenter>
      )}
    </Box>
  );
}
