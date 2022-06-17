import { Link } from 'react-router-dom';
import { Box, Spacer } from '@gilbarbara/components';

import Maze from './Maze';

function Footer() {
  return (
    <Box
      align="center"
      as="footer"
      border={[{ side: 'top' }]}
      bottom={0}
      display="flex"
      height={64}
      justify="space-between"
      left={0}
      position="fixed"
      px="md"
      right={0}
      variant="white"
      zIndex={50}
    >
      <Maze />
      <Spacer distribution="center" flex ml="xs">
        <Link to="/">Basic</Link>
        <Link to="/multi-route">Multi Route</Link>
        <Link to="/controlled">Controlled</Link>
        <Link to="/custom">Custom</Link>
        <Link to="/carousel">Carousel</Link>
        <Link to="/modal">Modal</Link>
        <Link to="/scroll">Scroll</Link>
      </Spacer>
      <Box height={32} width={32} />
    </Box>
  );
}

export default Footer;
