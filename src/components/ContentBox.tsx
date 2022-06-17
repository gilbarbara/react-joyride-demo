import React from 'react';
import { Box } from '@gilbarbara/components';

interface Props {
  children: React.ReactNode;
}

function ContentBox({ children }: Props) {
  return (
    <Box display="flex" justify="center" maxWidth={400} mx="auto">
      {children}
    </Box>
  );
}

export default ContentBox;
