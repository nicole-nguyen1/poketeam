import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Pokemons } from "./PokeList";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

interface Props {
	pokemons: Array<Pokemons>;
	setFilteredPokemons: React.Dispatch<React.SetStateAction<Array<Pokemons>>>;
}

export default function PokemonSearch({
	pokemons,
	setFilteredPokemons,
}: Props): JSX.Element {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		if (searchTerm !== "") {
			const filteredPokemons = pokemons.filter((pokemon) =>
				pokemon.name.includes(searchTerm)
			);
			setFilteredPokemons(filteredPokemons);
		} else {
			setFilteredPokemons(pokemons);
		}
	}, [searchTerm, setFilteredPokemons]);

	const debouncedResults = useMemo(() => {
		return debounce(handleSearch, 300);
	}, []);

	useEffect(() => {
		return () => {
			debouncedResults.cancel();
		};
	});

	return (
		<Input
			placeholder="Search by name"
			rightSection={<IconSearch size={16} />}
			onChange={debouncedResults}
		/>
	);
}
