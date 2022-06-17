import { Anchor, BoxCenter } from '@gilbarbara/components';

export default function CodeSandboxEdit() {
  return (
    <BoxCenter pb="jumbo" pt="xl" px="md" shade="lightest" variant="gray">
      <Anchor
        aria-label="Edit react-joyride on CodeSandbox"
        display="block"
        external
        href="https://codesandbox.io/s/github/gilbarbara/react-joyride-demo/tree/main"
      >
        <img
          alt="Edit react-joyride"
          src="https://codesandbox.io/static/img/play-codesandbox.svg"
        />
      </Anchor>
    </BoxCenter>
  );
}
