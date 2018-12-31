import React from 'react';

import { Box, Chart, Heading } from 'grommet';
import ContentBox from '../components/ContentBox';

const Growth = ({ setRef, size }) => (
  <Box fill data-name="growth" ref={setRef}>
    <Heading level={2} style={{ marginTop: 0 }}>Growth</Heading>
    <ContentBox>
      <Chart
        type="area"
        values={[
          {
            'value': [0, 10],
            'label': 'first',
          }, [20, 30], [30, 35], [40, 45], [60, 95]
        ]}
        color={{ color: 'white', opacity: 'strong' }}
        size={{
          height: 'small',
          width: 'large',
        }}
      />
    </ContentBox>
  </Box>
);

export default Growth;
