import { styled } from "styled-components";

export const StyledModal = styled.div`
  background-color: ${({ $animation }) =>
    $animation === "close-modal" ? "rgba(0, 0, 0, .0)" : "rgba(0, 0, 0, .6)"};
  height: 100%;
  position: absolute;
  transition: background-color .5s;
  width: 100%;
  z-index: 100;
`;

export const Container = styled.div`
  animation: ${({ $animation }) =>
    $animation === "close-modal" ? "hideDown" : "showUp"} 0.5s forwards;
  display: grid;
  height: 100%;
  place-items: center;
  transform: translateY(100%);
  width: 100%;

  & > div {
    background-color: #fff;
    border-radius: 0 0 15px 15px;
    height: 450px;
    max-width: 500px;
    position: relative;
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

  @keyframes hideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 50px 50px;
  position: absolute;
  transform: translateY(-50%);
  width: 100%;
`;

export const Button = styled.button`
  background-color: ${({ $isactive }) =>
    $isactive === "true" ? "#fff" : "#eee"};
  border-radius: 10px 10px 0 0;
  border: none;
  color: ${({ $isactive, $desc }) => {
    if ($isactive === "false") return "#ddd";
    if ($desc === "add") return "darkgreen";
    if ($desc === "deliver") return "#613fe5";
  }};
  font-weight: 600;
  padding: 10px 0;
`;

export const CloseContainer = styled.div`
  grid-column: 1 / span 2;
  
  button {
    background-color: transparent;
    border: none;
    color: #eee;
    float: right;
    font-size: 2em;
    margin: 10px;
  }
`;
