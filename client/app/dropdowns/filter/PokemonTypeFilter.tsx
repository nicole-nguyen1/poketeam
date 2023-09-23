import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Pokemons } from "../../PokeList";
import FilterBase from "./FilterBase";
import { flatten, uniq } from "lodash";

interface Props {
	pokemons: Array<Pokemons>;
	setFilteredPokemons: Dispatch<SetStateAction<Array<Pokemons>>>;
}

export default function PokemonTypeFilter({
	pokemons,
	setFilteredPokemons,
}: Props): JSX.Element {
	const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
		new Set()
	);
	const types = useMemo(() => {
		const flattenedTypes = flatten(pokemons.map((pokemon) => pokemon.types));
		return uniq(flattenedTypes);
	}, [pokemons]);

	useEffect(() => {
		if (selectedFilters.size > 0) {
			const filteredPokemons = pokemons.filter((pokemon) =>
				pokemon.types.some((type) => selectedFilters.has(type))
			);
			setFilteredPokemons(filteredPokemons);
		} else {
			setFilteredPokemons(pokemons);
		}
	}, [selectedFilters, pokemons, setFilteredPokemons]);

	return (
		<FilterBase
			filterType="Type"
			filterItems={types}
			selectedFilters={selectedFilters}
			setSelectedFilters={setSelectedFilters}
		/>
	);
}
