import { useState } from 'react';
import { useMount } from 'react-use';
import { Box, Button, FlexCenter, H2, Loader } from '@gilbarbara/components';

import { useAppContext } from '../context';

export default function Home() {
  const [showLoader, setLoader] = useState(false);
  const {
    setState,
    state: { run, tourActive },
  } = useAppContext();

  useMount(() => {
    if (tourActive) {
      setLoader(true);

      setTimeout(() => {
        setLoader(false);
        setState({ run: true, stepIndex: 0 });
      }, 600);
    }
  });

  const handleClickStart = () => {
    setState({ run: true, tourActive: true });
  };

  return (
    <Box>
      <H2 align="center" color="purple">
        <span id="home">Home</span>
      </H2>
      {tourActive && showLoader && (
        <FlexCenter height={100}>
          <Loader color="purple" size={100} />
        </FlexCenter>
      )}
      {!run && (
        <FlexCenter padding="xl">
          <Button bg="black" onClick={handleClickStart}>
            Start the tour
          </Button>
        </FlexCenter>
      )}
    </Box>
  );
}
