import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100px;
  max-width: 350px;
  width: 100%;

  #c1 {
    flex-grow: 4;
    img {
      border-radius: 15px 0 0 15px;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  #c2 {
    background-color: green;
    flex-grow: 3;
  }

  #c3 {
    background-color: blue;
    border-radius: 0 15px 15px 0;
    flex-grow: 3;
  }
`;
