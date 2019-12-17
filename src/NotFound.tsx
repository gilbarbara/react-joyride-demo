import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const FourZeroFour = styled.h1`
  font-size: 14rem;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <FourZeroFour>404</FourZeroFour>
    </Wrapper>
  );
};

export default NotFound;
