import React, { useEffect, useState } from "react";
import { fetchPokeAPIData } from "../utils/pokeAPIFetch";
import { Pokemons } from "../PokeList";
import { Button } from "@mantine/core";

interface PokemonsPayload {
	id: string;
	pokedex_number: string; // use for id
	pokemon_species_id: string; // use for sprite
	pokemon_v2_pokemonspecy: {
		name: string;
		pokemon_v2_pokemons: Array<{
			pokemon_v2_pokemonforms: Array<{
				id: string;
				name: string;
				form_name: string;
				pokemon_v2_pokemonformsprites: Array<{
					sprites: string;
				}>;
			}>;
			pokemon_v2_pokemontypes: Array<{
				pokemon_v2_type: {
					name: string;
				};
			}>;
		}>;
	};
}

interface SpeciesResponse {
	error: string;
	data: Promise<{
		pokedex: Array<{
			pokemon_v2_region: {
				name: string;
			};
			pokemon_v2_pokemondexnumbers: Array<PokemonsPayload>;
		}>;
	}>;
}

const query = `query getSpecies($id: Int) {
  pokedex: pokemon_v2_pokedex(where: {id: {_eq: $id}}) {
		pokemon_v2_region {
			name
		}
    pokemon_v2_pokemondexnumbers(order_by: {pokedex_number: asc}) {
			id
			pokedex_number
			pokemon_species_id
			pokemon_v2_pokemonspecy {
				name
				pokemon_v2_pokemons {
					pokemon_v2_pokemonforms {
						id
						name
						form_name
						pokemon_v2_pokemonformsprites {
							sprites
						}
					}
					pokemon_v2_pokemontypes {
						pokemon_v2_type {
							name
						}
					}
				}
			}
		}
  }
}
`;

interface Props {
	setError: React.Dispatch<React.SetStateAction<string>>;
	setPokemons: React.Dispatch<React.SetStateAction<Array<Pokemons>>>;
	pokedexID: number | null;
}

function GetPokemonButton({
	setError,
	setPokemons,
	pokedexID,
}: Props): JSX.Element {
	const [pokedex, setPokedex] = useState<Array<PokemonsPayload>>([]);
	const [regionName, setRegionName] = useState<string>("");

	const onClick = () => {
		const getSpecies = async () => {
			const response = await fetchPokeAPIData<SpeciesResponse>(
				query,
				"getSpecies",
				{ id: pokedexID }
			).then(
				async (res) => await res?.data,
				(rej) => rej.error
			);
			if (response != null) {
				setRegionName(response.data.pokedex[0].pokemon_v2_region.name);
				setPokedex(response.data.pokedex[0].pokemon_v2_pokemondexnumbers);
				setError(response.error);
			}
		};
		getSpecies();
	};

	useEffect(() => {
		if (pokedex != null) {
			const pokemon = pokedex.map((pokemon: PokemonsPayload) => {
				let id = pokemon.pokemon_species_id;
				const pokedex_number = pokemon.pokedex_number;
				const name = pokemon.pokemon_v2_pokemonspecy.name;
				const pokemonForms =
					pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemons;

				if (pokemonForms.length > 1) {
					const regionSpecificPokemonIdx = pokemonForms.findIndex(
						(pokemon) =>
							pokemon.pokemon_v2_pokemonforms[0].form_name === regionName
					);

					if (regionSpecificPokemonIdx > 0) {
						const spritesJSON = JSON.parse(
							pokemonForms[regionSpecificPokemonIdx].pokemon_v2_pokemonforms[0]
								.pokemon_v2_pokemonformsprites[0].sprites
						);
						id = spritesJSON["front_default"].match(/\d+/);
					}
				}
				const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

				return { id, pokedex_number, name, sprite };
			});
			setPokemons(pokemon);
		}
	}, [pokedex, regionName, setPokemons]);

	return (
		<Button variant="filled" onClick={onClick}>
			Get Pokemon
		</Button>
	);
}

export default GetPokemonButton;
