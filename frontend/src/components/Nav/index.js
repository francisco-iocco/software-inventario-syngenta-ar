import { IconBarcode, IconHome } from "@tabler/icons-react";
import { Navigation, List, Item, StyledLink } from "./styles";
import { useLocation } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <Navigation>
      <List>
        <Item animation={pathname === "/scanner" && true}>
          <StyledLink to="/scanner">
            <IconBarcode size="1em" />
          </StyledLink>
        </Item>
        <Item animation={pathname === "/" && true}>
          <StyledLink to="/">
            <IconHome size="1em" />
          </StyledLink>
        </Item>
      </List>
    </Navigation>
  );
}
