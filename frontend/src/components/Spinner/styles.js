import { styled } from "styled-components";

export const StyledSpinner = styled.div`
  animation: spin 1s linear infinite;
  border: 2px solid #aaa;
  border-bottom: none;
  border-radius: 50%;
  border-right-color: transparent;
  height: 3em;
  width: 3em;

  @keyframes spin {
    form {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
