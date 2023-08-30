import { useContext } from "react";
import { IconSearch } from "@tabler/icons-react";
import { Container, Label, Input } from "./styles";
import GadgetsContext from "contexts/GadgetsContext";

export default function SearchBar() {
  const { filterByName, setFilterByName } = useContext(GadgetsContext);

  const handleFilter = ({ target }) => setFilterByName(target.value);

  return (
    <Container>
      <Label htmlFor="search-bar">
        <IconSearch />
      </Label>
      <Input
        type="text"
        id="search-bar"
        placeholder="Buscar"
        value={filterByName}
        onChange={handleFilter}
      />
    </Container>
  );
}
