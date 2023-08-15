import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Navigation = styled.nav`
  bottom: 0;
  box-shadow: rgb(245, 245, 245) 0px 0px 20px 0px;
  height: 75px;
  padding: 10px;
  position: absolute;
  width: 100%;
  z-index: 5;
  background-color: #fff;
`;

export const List = styled.ul`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  list-style-type: none;
  width: 100%;
`;

export const Item = styled.li`
  background-color: #eee;
  overflow: hidden;
  position: relative;

  &::before {
    ${({ animation }) => animation && `animation: paintFromCorner 1s forwards;`}
    background-color: #000;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    transform: translate(100%, -100%);
    width: 100%;
  }

  @keyframes paintFromCorner {
    from {
      transform: translate(100%, -100%);
    }
    to {
      transform: translate(0, 0);
    }
  } 
`;

export const StyledLink = styled(Link)`
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  background-color: #fff;
  color: #000;
  display: flex;
  font-size: 2em;
  justify-content: space-evenly;
  mix-blend-mode: screen;
`;
