import { Box, DataTable, H2, Props, Text } from '@gilbarbara/components';

import ContentBox from '../components/ContentBox';

type Columns = 'name' | 'percentage' | 'paid';

const columns: Props.DataTableColumn<Columns>[] = [
  {
    key: 'name',
    title: <Text>Name</Text>,
    size: 120,
  },
  {
    key: 'percentage',
    title: 'Percentage',
    min: 120,
  },
  {
    key: 'paid',
    title: 'Paid',
  },
];

const data = [
  {
    name: 'Alan',
    paid: 123,
    percentage: <Box bg="green" height={8} width={15} />,
  },
  {
    name: 'Beatrice',
    paid: 234,
    percentage: <Box bg="green" height={8} width={30} />,
  },
  {
    name: 'Eric',
    paid: 456,
    percentage: <Box bg="green" height={8} width={95} />,
  },
  {
    name: 'Tracy',
    paid: 246,
    percentage: <Box bg="green" height={8} width={50} />,
  },
];

export default function Users() {
  return (
    <Box>
      <H2>Users</H2>
      <ContentBox>
        <DataTable clean columns={columns} data={data} />
      </ContentBox>
    </Box>
  );
}
