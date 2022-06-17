import { NavLink } from 'react-router-dom';
import { Button, Container, H1, Spacer } from '@gilbarbara/components';

export default function Header() {
  const style = { textDecoration: 'none' };

  return (
    <Container verticalPadding>
      <Spacer distribution="center">
        <NavLink end style={style} to="/multi-route">
          {({ isActive }) => (
            <Button invert={!isActive} size="sm" variant="purple">
              Home
            </Button>
          )}
        </NavLink>

        <NavLink style={style} to="/multi-route/a">
          {({ isActive }) => (
            <Button invert={!isActive} size="sm" variant="purple">
              Route A
            </Button>
          )}
        </NavLink>

        <NavLink style={style} to="/multi-route/b">
          {({ isActive }) => (
            <Button invert={!isActive} size="sm" variant="purple">
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
