import { styled } from "styled-components";

export const Frame = styled.div`
  ${({ animation }) => animation && `animation: translate 1.5s ease-in-out 1s forwards;`}
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 3em;
  justify-content: center;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 3em;

  @keyframes translate {
    0% {
      top: 50%;
    }
    33% {
      top: 0;
      transform: translate(-50%, -50%) scale(5);
    }
    100% {
      top: -100%;
      transform: translate(-50%, -100%) scale(1);
    }
  }
`;

export const StyledSpinner = styled.div`
  animation: spin 1s linear infinite;
  border: 2px solid #aaa;
  border-bottom: none;
  border-radius: 50%;
  border-right-color: transparent;
  height: 100%;
  width: 100%;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Cover = styled.div`
  ${({ animation }) => animation && `animation: putOver 1s linear forwards;`}
  background-color: #aaa;
  height: 100%;
  position: absolute;
  transform: translateY(-100%);
  width: 100%;

  @keyframes putOver {
    form {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
`
