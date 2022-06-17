import { Box, Button, H2 } from '@gilbarbara/components';

import { useAppContext } from '../context';

export default function Home() {
  const {
    setState,
    state: { run },
  } = useAppContext();

  const handleClickStart = () => {
    setState({ run: true, tourActive: true });
  };

  return (
    <Box>
      <H2 align="center" variant="purple">
        <span id="home">Home</span>
      </H2>
      {!run && (
        <Box padding="xl" textAlign="center">
          <Button onClick={handleClickStart} variant="black">
            Start the tour
          </Button>
        </Box>
      )}
    </Box>
  );
}
