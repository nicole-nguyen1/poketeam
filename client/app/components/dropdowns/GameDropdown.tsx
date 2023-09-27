import { useEffect, useState } from "react";
import { fetchPokeAPIData } from "../../utils/pokeAPIFetch";
import { Select } from "@mantine/core";

interface PokemonGamePayload {
	name: string;
	pokemon_v2_pokedexversiongroups: Array<{
		pokedex_id?: number;
	}>;
}

interface GamesResponse {
	error: string;
	data: Promise<{ versions: Array<PokemonGamePayload> }>;
}

interface PokemonGame {
	name: string;
	pokedex_id: number;
}

const query = `query getGames {
  versions: pokemon_v2_versiongroup {
    name
    pokemon_v2_pokedexversiongroups {
      pokedex_id
    }
  }
}
`;

interface Props {
	pokedexID: number | null;
	setPokedexID: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function GameDropdown({
	pokedexID,
	setPokedexID,
}: Props): JSX.Element {
	const [error, setError] = useState("");
	const [games, setGames] = useState<Array<PokemonGame> | null>(null);

	useEffect(() => {
		if (games == null) {
			const getGames = async () => {
				const response = await fetchPokeAPIData<GamesResponse>(
					query,
					"getGames"
				).then(
					async (res) => await res.data?.data,
					(rej) => rej.error
				);
				if (response != null) {
					const games = response.versions
						.filter(
							(game: PokemonGamePayload) =>
								game.pokemon_v2_pokedexversiongroups[0]?.pokedex_id != null
						)
						.map((game: PokemonGamePayload) => ({
							name: game.name,
							pokedex_id: game.pokemon_v2_pokedexversiongroups[0]?.pokedex_id,
						}));

					setGames(games);
					setError(response.error);
				}
			};
			getGames();
		}
	}, [games, setPokedexID]);

	return (
		<Select
			placeholder="Pick your Pokemon game"
			data={(games ?? []).map((game) => ({
				value: `${String(game.pokedex_id)}_${game.name}`,
				label: game.name,
			}))}
			onChange={(val) => setPokedexID(Number(val?.match(/\d+/)))}
			error={error}
			// styles
			mb={16}
			w={"100%"}
		/>
	);
}
