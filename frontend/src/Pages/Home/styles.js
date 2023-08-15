import { styled } from "styled-components";

export const Container = styled.main`
  height: calc(100% - 75px);
  padding: 20px;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  margin: auto;
  width: 10em;

  img {
    margin: 20px 0;
    width: 100%;
  }
`;
