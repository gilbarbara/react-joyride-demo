import { Link } from 'react-router-dom';
import { Anchor, Box, Flex, Spacer } from '@gilbarbara/components';

import Maze from './Maze';

function Footer() {
  return (
    <Flex
      align="center"
      as="footer"
      bg="white"
      border={[{ side: 'top' }]}
      bottom={0}
      display="flex"
      gap="xs"
      height={64}
      justify="space-between"
      left={0}
      position="fixed"
      px="md"
      right={0}
      role="contentinfo"
      zIndex={50}
    >
      <Maze />
      <Anchor href="https://docs.react-joyride.com" rel="noopener noreferrer" target="_blank">
        Docs
      </Anchor>
      <Flex flex gap="xs" justify="center" wrap="wrap">
        <Link to="/">Basic</Link>
        <Link to="/multi-route">Multi Route</Link>
        <Link to="/controlled">Controlled</Link>
        <Link to="/custom">Custom</Link>
        <Link to="/carousel">Carousel</Link>
        <Link to="/modal">Modal</Link>
        <Link to="/scroll">Scroll</Link>
      </Flex>
    </Flex>
  );
}

export default Footer;
