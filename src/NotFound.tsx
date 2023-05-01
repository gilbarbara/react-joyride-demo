import { Link } from 'react-router-dom';
import { Button, NonIdealState, Page } from '@gilbarbara/components';

function NotFound() {
  return (
    <Page centered>
      <NonIdealState type="not-found">
        <Link to="/">
          <Button variant="black">Go Home</Button>
        </Link>
      </NonIdealState>
    </Page>
  );
}

export default NotFound;
