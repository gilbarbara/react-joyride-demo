import React, { Component } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import styled from 'styled-components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

interface State {
  run: boolean;
  steps: Step[];
}

const Wrapper = styled.div`
  align-items: center;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const Code = styled.code`
  background-color: #000;
  color: #fff;
  display: block;
  margin-bottom: 15px;
  padding: 15px;
  white-space: pre;
`;

const Scroller = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  height: 50vh;
  max-width: 800px;
  margin: 0 auto;
  overflow: scroll;
  padding: 15px;
`;

const Heading = styled.h1`
  color: #f04;
  margin: 0 0 30px;
`;

export default class ScrollDemo extends Component<any, State> {
  public state = {
    run: true,
    steps: [
      {
        content: 'The latest version of React!',
        placement: 'bottom' as 'bottom',
        target: '.app__scroller h2',
        textAlign: 'center',
      },
      {
        content: 'Nobody likes errors! 🤬',
        placement: 'top' as 'top',
        target: '.app__scroller h3:nth-of-type(2)',
      },
      {
        content: 'Yay! Portals are awesome',
        placement: 'top' as 'top',
        target: '.app__scroller h3:nth-of-type(3)',
      },
      {
        content: 'SSR is supported',
        placement: 'top' as 'top',
        target: '.app__scroller h3:nth-of-type(4)',
      },
    ],
  };

  public componentDidMount() {
    a11yChecker();
  }

  private handleJoyrideCallback = (data: CallBackProps) => {
    const { type } = data;

    // tslint:disable:no-console
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
    // tslint:enable:no-console
  };

  private renderContent() {
    return (
      <div>
        <h2 style={{ marginTop: 0 }}>React 16</h2>
        <p>
          We’re excited to announce the release of React v16.0! Among the changes are some
          long-standing feature requests, including fragments, error boundaries, portals, support
          for custom DOM attributes, improved server-side rendering, and reduced file size.
        </p>

        <h3>New render return types: fragments and strings</h3>
        <p>
          You can now return an array of elements from a component’s render method. Like with other
          arrays, you’ll need to add a key to each element to avoid the key warning:
        </p>

        <Code>{`render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
`}</Code>

        <p>
          Starting with React 16.2.0, we are adding support for a special fragment syntax to JSX
          that doesn’t require keys.
        </p>

        <p>We’ve added support for returning strings, too:</p>

        <Code>{`render() {
  return 'Look ma, no spans!';
}
`}</Code>

        <h3>Better error handling</h3>
        <p>
          Previously, runtime errors during rendering could put React in a broken state, producing
          cryptic error messages and requiring a page refresh to recover. To address this problem,
          React 16 uses a more resilient error-handling strategy. By default, if an error is thrown
          inside a component’s render or lifecycle methods, the whole component tree is unmounted
          from the root. This prevents the display of corrupted data. However, it’s probably not the
          ideal user experience.
        </p>

        <p>
          Instead of unmounting the whole app every time there’s an error, you can use error
          boundaries. Error boundaries are special components that capture errors inside their
          subtree and display a fallback UI in its place. Think of error boundaries like try-catch
          statements, but for React components.
        </p>

        <p>For more details, check out our previous post on error handling in React 16.</p>

        <h3>Portals</h3>
        <p>
          Portals provide a first-class way to render children into a DOM node that exists outside
          the DOM hierarchy of the parent component.
        </p>

        <Code>{`render() {
// React does *not* create a new div. It renders the children into \`domNode\`.
// \`domNode\` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode,
  );
}`}</Code>

        <h3>Better server-side rendering</h3>
        <p>
          React 16 includes a completely rewritten server renderer. It’s really fast. It supports
          streaming, so you can start sending bytes to the client faster. And thanks to a new
          packaging strategy that compiles away process.env checks (Believe it or not, reading
          process.env in Node is really slow!), you no longer need to bundle React to get good
          server-rendering performance.
        </p>

        <p>
          Core team member Sasha Aickin wrote a great article describing React 16’s SSR
          improvements. According to Sasha’s synthetic benchmarks, server rendering in React 16 is
          roughly three times faster than React 15. “When comparing against React 15 with
          process.env compiled out, there’s about a 2.4x improvement in Node 4, about a 3x
          performance improvement in Node 6, and a full 3.8x improvement in the new Node 8.4
          release. And if you compare against React 15 without compilation, React 16 has a full
          order of magnitude gain in SSR in the latest version of Node!” (As Sasha points out,
          please be aware that these numbers are based on synthetic benchmarks and may not reflect
          real-world performance.)
        </p>

        <p>
          In addition, React 16 is better at hydrating server-rendered HTML once it reaches the
          client. It no longer requires the initial render to exactly match the result from the
          server. Instead, it will attempt to reuse as much of the existing DOM as possible. No more
          checksums! In general, we don’t recommend that you render different content on the client
          versus the server, but it can be useful in some cases (e.g. timestamps). However, it’s
          dangerous to have missing nodes on the server render as this might cause sibling nodes to
          be created with incorrect attributes.
        </p>

        <p>See the documentation for ReactDOMServer for more details.</p>

        <h3>Support for custom DOM attributes</h3>
        <p>
          Instead of ignoring unrecognized HTML and SVG attributes, React will now pass them through
          to the DOM. This has the added benefit of allowing us to get rid of most of React’s
          attribute whitelist, resulting in reduced file sizes.
        </p>

        <h3>Reduced file size</h3>
        <p>Despite all these additions, React 16 is actually smaller compared to 15.6.1!</p>

        <p>
          react is 5.3 kb (2.2 kb gzipped), down from 20.7 kb (6.9 kb gzipped). react-dom is 103.7
          kb (32.6 kb gzipped), down from 141 kb (42.9 kb gzipped). react + react-dom is 109 kb
          (34.8 kb gzipped), down from 161.7 kb (49.8 kb gzipped). That amounts to a combined 32%
          size decrease compared to the previous version (30% post-gzip).
        </p>

        <p>
          The size difference is partly attributable to a change in packaging. React now uses Rollup
          to create flat bundles for each of its different target formats, resulting in both size
          and runtime performance wins. The flat bundle format also means that React’s impact on
          bundle size is roughly consistent regardless of how you ship your app, whether it’s with
          Webpack, Browserify, the pre-built UMD bundles, or any other system.
        </p>

        <h3>MIT licensed</h3>
        <p>
          In case you missed it, React 16 is available under the MIT license. We’ve also published
          React 15.6.2 under MIT, for those who are unable to upgrade immediately.
        </p>

        <h3>New core architecture</h3>
        <p>
          React 16 is the first version of React built on top of a new core architecture, codenamed
          “Fiber.” You can read all about this project over on Facebook’s engineering blog.
          (Spoiler: we rewrote React!)
        </p>

        <p>
          Fiber is responsible for most of the new features in React 16, like error boundaries and
          fragments. Over the next few releases, you can expect more new features as we begin to
          unlock the full potential of React.
        </p>

        <p>
          Perhaps the most exciting area we’re working on is async rendering—a strategy for
          cooperatively scheduling rendering work by periodically yielding execution to the browser.
          The upshot is that, with async rendering, apps are more responsive because React avoids
          blocking the main thread.
        </p>

        <p>This demo provides an early peek at the types of problems async rendering can solve:</p>
      </div>
    );
  }

  public render() {
    const { run, steps } = this.state;

    return (
      <Wrapper>
        <Joyride
          run={run}
          steps={steps}
          continuous={true}
          scrollToFirstStep={true}
          callback={this.handleJoyrideCallback}
        />
        <Heading>Works with custom scrolling parents!</Heading>
        <Scroller className="app__scroller">{this.renderContent()}</Scroller>
      </Wrapper>
    );
  }
}
