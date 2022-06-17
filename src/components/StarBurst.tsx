import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';

const Component = styled.div`
  align-items: center;
  background: #202020;
  color: #fff;
  display: flex;
  font: 3rem 'Lobster', georgia, serif;
  height: 2.5em;
  position: sticky;
  justify-content: center;
  padding: 15px;
  text-align: center;
  top: 20px;
  left: 100vw;
  width: 2.5em;

  span {
    align-items: center;
    display: flex;
    justify-content: center;
    transform: rotate(15deg);
  }

  &:before,
  &:after,
  & span:before,
  & span:after {
    background: inherit;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: rotate(30deg);
    width: 100%;
    z-index: -1;
  }

  &:after {
    transform: rotate(-30deg);
  }

  & span:after {
    transform: rotate(30deg);
  }
  & span:before {
    transform: rotate(-30deg);
  }
`;

export default function StarBurst({ children, ...rest }: AnyObject) {
  return (
    <Component {...rest}>
      <span>{children}</span>
    </Component>
  );
}
