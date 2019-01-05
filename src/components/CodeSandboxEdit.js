import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
background-color: #f7f7f7;
  padding: 30px 15px 90px;
  text-align: center;
`;

const CodeSandboxEdit = () => (
  <Wrapper>
    <a href="https://codesandbox.io/s/github/gilbarbara/react-joyride-demo" className="codesandbox-edit" aria-label="Edit react-joyride on CodeSandbox">
      <img
        alt="Edit react-joyride"
        src="https://codesandbox.io/static/img/play-codesandbox.svg"
      />
    </a>
  </Wrapper>
);

export default CodeSandboxEdit;
