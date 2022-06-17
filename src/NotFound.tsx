import { Link } from 'react-router-dom';
import { Button, Main, NonIdealState } from '@gilbarbara/components';

function NotFound() {
  return (
    <Main centered>
      <NonIdealState type="not-found">
        <Link to="/">
          <Button variant="black">Go Home</Button>
        </Link>
      </NonIdealState>
    </Main>
  );
}

export default NotFound;
