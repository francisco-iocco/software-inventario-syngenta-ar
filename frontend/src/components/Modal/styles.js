import { styled } from "styled-components";

export const StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 100;
`;

export const Container = styled.div`
  animation: showUp 0.5s forwards;
  display: grid;
  height: 100%;
  place-items: center;
  transform: translateY(100%);
  width: 100%;

  & > div {
    background-color: #fff;
    height: 450px;
    max-width: 500px;
    width: 90%;
  }

  @keyframes showUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;
