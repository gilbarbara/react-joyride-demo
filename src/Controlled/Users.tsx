import { IObject, IRefParams } from '../types/common';
import React from 'react';

import { Box, DataTable, DataTableProps, Heading, Meter, MeterProps, Text } from 'grommet';
import ContentBox from '../components/ContentBox';

const columns: DataTableProps['columns'] = [
  {
    footer: 'Total',
    header: <Text>Name</Text>,
    primary: true,
    property: 'name',
  },
  {
    header: 'Percent Complete',
    property: 'percent',
    render: (datum: IObject) => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter
          values={[{ value: datum.percent }] as MeterProps['values']}
          thickness="small"
          size="small"
        />
      </Box>
    ),
  },
  {
    aggregate: 'sum',
    align: 'end',
    footer: { aggregate: true },
    header: 'Paid',
    property: 'paid',
    render: (datum: IObject) => datum.paid,
  },
];

const DATA = [
  {
    name: 'Alan',
    paid: 0,
    percent: 0,
  },
  {
    name: 'Beatrice',
    paid: 1234,
    percent: 30,
  },
  {
    name: 'Chris',
    paid: 2345,
    percent: 40,
  },
  {
    name: 'Eric',
    paid: 3456,
    percent: 80,
  },
  {
    name: 'Louise',
    paid: 3456,
    percent: 40,
  },
  {
    name: 'Tracy',
    paid: 2345,
    percent: 10,
  },
];

const Users = ({ setRef }: IRefParams) => (
  <Box fill={true} data-name="users" ref={setRef}>
    <Heading level={2} style={{ marginTop: 0 }}>
      Users
    </Heading>
    <ContentBox>
      <DataTable columns={columns} data={DATA} />
    </ContentBox>
  </Box>
);

export default Users;
