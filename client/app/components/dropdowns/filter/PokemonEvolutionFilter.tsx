import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Pokemons } from "../../PokeList";
import FilterBase from "./FilterBase";
import { fetchPokeAPIData } from "../../../utils/pokeAPIFetch";
import { flatten, uniq, uniqBy } from "lodash";

interface EvolutionPayload {
	id: string;
	pokemon_v2_pokemonspecy: {
		name: string;
		pokemon_v2_evolutionchain: {
			pokemon_v2_pokemonspecies: Array<{
				name: string;
				id: string;
				evolves_from_species_id: string;
				is_baby: boolean;
			}>;
		};
	};
}

interface EvolutionsResponse {
	error: string;
	data: Promise<{
		pokedex: Array<{
			pokemon_v2_pokemondexnumbers: Array<EvolutionPayload>;
		}>;
	}>;
}

const query = `query getEvolutionChains($id: Int) {
  pokedex: pokemon_v2_pokedex(where: {id: {_eq: $id}}) {
    pokemon_v2_pokemondexnumbers(order_by: {pokedex_number: asc}) {
			id
			pokemon_v2_pokemonspecy {
				name
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies(order_by: {order: asc}) {
            name
            id
            evolves_from_species_id
            is_baby
          }
        }
			}
		}
  }
}
`;

interface Props {
	pokedexID: number | null;
	pokemons: Array<Pokemons>;
	setFilteredPokemons: Dispatch<SetStateAction<Array<Pokemons>>>;
}

export default function PokemonEvolutionFilter({
	pokedexID,
	pokemons,
	setFilteredPokemons,
}: Props): JSX.Element {
	const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
		new Set()
	);
	const [pokedex, setPokedex] = useState<Array<EvolutionPayload>>([]);

	const evolutionStages = [
		"baby",
		"basic",
		"stage_1",
		"stage_2",
		"no_evolution",
	];
	const [pokemonByStages, setPokemonByStages] = useState<{
		[stage: string]: Set<string>;
	}>({});

	useEffect(() => {
		if (pokedexID != null) {
			const getEvolutionChains = async () => {
				const response = await fetchPokeAPIData<EvolutionsResponse>(
					query,
					"getEvolutionChains",
					{ id: pokedexID }
				).then(
					async (res) => await res?.data?.data,
					(rej) => rej.error
				);
				if (response != null) {
					setPokedex(response.pokedex[0].pokemon_v2_pokemondexnumbers);
				}
			};
			getEvolutionChains();
		}
	}, [pokedexID, setPokedex]);

	useEffect(() => {
		const init: {
			[stage: string]: Set<string>;
		} = Object.fromEntries(evolutionStages.map((stage) => [stage, new Set()]));
		const chains = uniqBy(
			flatten(
				pokedex.map(
					(pokemon) =>
						pokemon.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain
							.pokemon_v2_pokemonspecies
				)
			),
			(pokemon) => pokemon.id
		);

		chains.forEach((pokemon, idx) => {
			// if baby
			if (pokemon.is_baby === true) {
				init.baby.add(pokemon.id);
			}
			// if no evolution
			else if (
				pokemon.evolves_from_species_id == null &&
				chains.at(idx + 1)?.evolves_from_species_id == null
			) {
				init.no_evolution.add(pokemon.id);
			}
			// if basic
			else if (pokemon.evolves_from_species_id == null && !pokemon.is_baby) {
				init.basic.add(pokemon.id);
			}
			// if stage 1, is an evolution of prev and has future evolution
			else if (
				pokemon.evolves_from_species_id != null &&
				chains.at(idx + 1)?.evolves_from_species_id === pokemon.id
			) {
				init.stage_1.add(pokemon.id);
			}
			// stage 2
			else {
				init.stage_2.add(pokemon.id);
			}
			return init;
		});
		setPokemonByStages(init);
	}, [pokedex]);

	useEffect(() => {
		if (selectedFilters.size > 0) {
			const pokemonByID: { [id: string]: Pokemons } = Object.fromEntries(
				pokemons.map((pokemon) => [pokemon.id, pokemon])
			);
			let filteredPokemons: Array<Pokemons> = [];
			selectedFilters.forEach((filter) => {
				pokemonByStages[filter].forEach((id) => {
					if (pokemonByID[id] != null) {
						filteredPokemons.push(pokemonByID[id]);
					}
				});
			});
			setFilteredPokemons(filteredPokemons);
		} else {
			setFilteredPokemons(pokemons);
		}
	}, [selectedFilters, pokemons, setFilteredPokemons]);

	return (
		<FilterBase
			filterType="Evolution Stage"
			filterItems={evolutionStages}
			selectedFilters={selectedFilters}
			setSelectedFilters={setSelectedFilters}
		/>
	);
}
