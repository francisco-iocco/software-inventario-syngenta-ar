import { styled } from "styled-components";

export const Container = styled.main`
  height: calc(100% - 75px);
  position: relative;
  width: 100%;
`;

export const Redline = styled.span`
  border: 1px solid red;
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  z-index: 5;
`