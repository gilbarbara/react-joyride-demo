import { Box, H2 } from '@gilbarbara/components';

import Chart from './Chart';

import ContentBox from '../components/ContentBox';

function Growth() {
  return (
    <Box>
      <H2>Growth</H2>
      <ContentBox>
        <Chart />
      </ContentBox>
    </Box>
  );
}

export default Growth;
