import { NavLink } from 'react-router-dom';
import { Button, Container, H1, Spacer } from '@gilbarbara/components';

export default function Header() {
  const style = { textDecoration: 'none' };

  return (
    <Container verticalPadding>
      <Spacer distribution="center">
        <NavLink end style={style} to="/multi-route">
          {({ isActive }) => (
            <Button bg="purple" size="sm" variant={isActive ? 'solid' : 'bordered'}>
              Home
            </Button>
          )}
        </NavLink>

        <NavLink style={style} to="/multi-route/a">
          {({ isActive }) => (
            <Button bg="purple" size="sm" variant={isActive ? 'solid' : 'bordered'}>
              Route A
            </Button>
          )}
        </NavLink>

        <NavLink style={style} to="/multi-route/b">
          {({ isActive }) => (
            <Button bg="purple" size="sm" variant={isActive ? 'solid' : 'bordered'}>
              Route B
            </Button>
          )}
        </NavLink>
      </Spacer>

      <H1 align="center" mt="lg">
        Multi-route
      </H1>
    </Container>
  );
}
