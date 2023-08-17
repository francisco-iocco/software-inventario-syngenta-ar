import { styled } from "styled-components";

export const Container = styled.div`
  border-radius: 15px;
  box-shadow: #f5f5f5 0px 0px 20px 0px;
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  grid-template-rows: 30px 70px;
  max-width: 350px;
  transition: background-color 0.5s;
  width: 100%;

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(1.03);

    img {
      filter: brightness(70%);
      transition: filter 0.5s;
    }
  }

  @media screen and (min-width: 480px) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;

      img {
        filter: brightness(70%);
        transition: filter 0.5s;
      }
    }
  }
`;

export const Image = styled.div`
  grid-row: 1 / span 2;

  img {
    border-radius: 15px 0 0 15px;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export const Name = styled.p`
  align-items: center;
  border-bottom: 1px solid #eee;
  display: flex;
  grid-column: 2 / span 3;
  justify-content: center;
`;

export const Details = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;

  p {
    color: ${({ type }) => (type === "stock" ? `darkgreen` : `#613fe5`)};
  }

  span {
    border: 2px solid
      ${({ type }) => (type === "stock" ? `darkgreen` : `#613fe5`)};
    color: ${({ type }) => (type === "stock" ? `darkgreen` : `#613fe5`)};
    padding: 5px;
  }

  &:last-of-type {
    border-left: 1px solid #eee;
  }
`;
