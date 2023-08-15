import { Container, Label, Input } from "./styles";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar() {
  return (
    <Container>
      <Label htmlFor="search-bar">
        <IconSearch />
      </Label>
      <Input type="text" id="search-bar" placeholder="Buscar" />
    </Container>
  );
}
