import { IObject, IRefParams } from '../types/common';
import React from 'react';
import { Box, Diagram, Heading, Stack } from 'grommet';

import ContentBox from '../components/ContentBox';

const Node = ({ id, ...rest }: IObject) => (
  <Box
    id={id}
    basis="xxsmall"
    margin="small"
    pad="medium"
    round="small"
    background="accent-1"
    {...rest}
  />
);

const connection = (fromTarget: string, toTarget: string, { color, ...rest }: IObject = {}) => ({
  anchor: 'vertical' as const,
  color: color || 'accent-1',
  fromTarget,
  round: true,
  thickness: 'xsmall',
  toTarget,
  type: 'rectilinear' as const,
  ...rest,
});

const Connections = ({ setRef }: IRefParams) => (
  <Box fill={true} data-name="connections" ref={setRef}>
    <Heading level={2} style={{ marginTop: 0 }}>
      Connections
    </Heading>
    <ContentBox>
      <Stack>
        <Box>
          <Box direction="row">
            {[1, 2, 3].map(id => (
              <Node key={id} id={id} />
            ))}
          </Box>
          <Box direction="row">
            {[4, 5].map(id => (
              <Node key={id} id={id} background="accent-2" />
            ))}
          </Box>
          <Box direction="row">
            {[6, 7, 8, 9].map(id => (
              <Node key={id} id={id} background="accent-3" />
            ))}
          </Box>
        </Box>
        <Diagram
          connections={[
            connection('1', '5', { color: 'white' }),
            connection('3', '5', { color: 'white', anchor: 'horizontal' }),
            connection('4', '7', { color: 'white', anchor: 'horizontal' }),
            connection('5', '9', { color: 'white' }),
          ]}
        />
      </Stack>
    </ContentBox>
  </Box>
);

export default Connections;
