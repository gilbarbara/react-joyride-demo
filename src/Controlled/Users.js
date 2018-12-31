import React from 'react';

import { Box, DataTable, Heading, Meter, Text } from 'grommet';
import ContentBox from '../components/ContentBox';

const columns = [
  {
    property: 'name',
    header: <Text>Name</Text>,
    primary: true,
    footer: 'Total'
  },
  {
    property: 'percent',
    header: 'Percent Complete',
    render: datum => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter
          values={[{ value: datum.percent }]}
          thickness="small"
          size="small"
        />
      </Box>
    )
  },
  {
    property: 'paid',
    header: 'Paid',
    render: datum => datum.paid,
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true }
  }
];

const DATA = [
  {
    name: 'Alan',
    percent: 0,
    paid: 0
  },
  {
    name: 'Beatrice',
    percent: 30,
    paid: 1234
  },
  {
    name: 'Chris',
    percent: 40,
    paid: 2345
  },
  {
    name: 'Eric',
    percent: 80,
    paid: 3456
  },
  {
    name: 'Louise',
    percent: 40,
    paid: 3456
  },
  {
    name: 'Tracy',
    percent: 10,
    paid: 2345
  }
];

const Users = ({ setRef }) => (
  <Box fill data-name="users" ref={setRef}>
    <Heading level={2} style={{ marginTop: 0 }}>Users</Heading>
    <ContentBox>
      <DataTable columns={columns} data={DATA} />
    </ContentBox>
  </Box>
);

export default Users;
