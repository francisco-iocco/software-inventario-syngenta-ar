import { styled } from "styled-components";

export const Section = styled.div`
  align-items: center;
  display: flex;
  height: 50%;
  justify-content: center;
  position: relative;
`;

// TransitionBlock has two similar animations
// First one changes pages when it ends (the element is covering all the page, so we don't see it)
// Second one dissapears the current page
export const TransitionBlock = styled.div`
  ${({ animation }) => animation && `animation: slideDown 1s linear 3.5s forwards, slideDown2 1s linear 4.5s forwards;`}
  background-color: #aaa;
  height: 200vh;
  position: absolute;
  transform: translateY(-110%);
  width: 100%;
  z-index: 10;

  @keyframes slideDown {
    from {
      transform: translateY(-110%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDown2 {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(110%);
    }
  }
`;
