import { Box, DatePicker, H2 } from '@gilbarbara/components';

import ContentBox from '../components/ContentBox';

export default function Calendar() {
  return (
    <Box>
      <H2>Calendar</H2>
      <ContentBox>
        <DatePicker />
      </ContentBox>
    </Box>
  );
}
