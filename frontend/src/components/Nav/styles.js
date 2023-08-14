import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Navigation = styled.nav`
  bottom: 0;
  box-shadow: 0 0 30px 1px #eee;
  height: 75px;
  padding: 10px;
  position: absolute;
  width: 100%;
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
    ${({ animation }) => animation && `animation: paintFromCorner 1s;`}
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
  align-items: center;
  background-color: #fff;
  color: #000;
  display: flex;
  font-size: 2em;
  justify-content: space-evenly;
  mix-blend-mode: screen;
`;