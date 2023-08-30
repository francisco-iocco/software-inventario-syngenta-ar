import { styled } from "styled-components";

export const Gadgets = styled.div`
  align-content: center;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin: auto;
  margin-top: 30px;
  width: 100%;

  p.error {
    color: red;
  }
`;

export const LoadingGadget = styled.div`
  background-color: #f5f5f5;
  border-radius: 15px;
  display: grid;
  height: 100px;
  max-width: 350px;
  overflow: hidden;
  place-items: center;
  width: 100%;

  div {
    align-items: center;
    animation: titilar 1s linear infinite;
    display: flex;
    height: 100%;
    position: relative;
    transform: translateX(-100%);
    width: 100%;

    @keyframes titilar {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(150%);
      }
    }

    &::before {
      background-color: #eee;
      box-shadow: 0 0 10px 10px #eee;
      content: "";
      height: 150%;
      position: absolute;
      transform: rotate(45deg);
      width: 5px;
    }
  }
`;
