import { styled } from "styled-components";

export const StyledSpinner = styled.div`
  align-items: center;
  border-radius: 50%;
  border: 5px solid #f5f5f5;
  display: flex;
  height: 3em;
  justify-content: center;
  position: relative;
  width: 3em;

  &::before {
    animation: spin 1s linear infinite;
    border-bottom-color: #eee;
    border-radius: 50%;
    border: 5px solid #f7f7f7;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
