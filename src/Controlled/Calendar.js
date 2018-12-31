import React from 'react';

import { Box, Calendar, Heading } from 'grommet';
import ContentBox from '../components/ContentBox';

const CalendarBox = ({ setRef, size }) => (
  <Box fill data-name="calendar" ref={setRef}>
    <Heading level={2} style={{ marginTop: 0 }}>Calendar</Heading>
    <ContentBox>
      <Calendar size="small" />
    </ContentBox>
  </Box>
);

export default CalendarBox;
