import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Boxy = styled(Box)`
  margin: 0 auto;
  max-width: 400px;
`;

interface Props {
  children: React.ReactNode;
}

const ContentBox = ({ children }: Props) => (
  // @ts-ignore
  <Boxy align="center">{children}</Boxy>
);

export default ContentBox;
