"use client";

import { useState } from "react";
import { Header } from "./Header";
import GameDropdown from "./dropdowns/GameDropdown";
import PokeList, { Pokemons } from "./PokeList";
import GetPokemonButton from "./buttons/GetPokemonButton";
import { Container, Flex } from "@mantine/core";

import classes from "./page.module.css";

export default function HomePage() {
	const [error, setError] = useState("");
	const [pokemons, setPokemons] = useState<Array<Pokemons>>([]);
	const [pokedexID, setPokedexID] = useState<number | null>(null);

	return (
		<>
			<Header />
			<Container size="md" className={classes.inner}>
				<Flex
					direction={{ base: "column", sm: "row" }}
					gap={"sm"}
					justify={"space-between"}
				>
					<GameDropdown pokedexID={pokedexID} setPokedexID={setPokedexID} />
					<GetPokemonButton
						pokedexID={pokedexID}
						setError={setError}
						setPokemons={setPokemons}
					/>
				</Flex>
				{error != null && <p>{error}</p>}
				<PokeList pokemons={pokemons} />
			</Container>
		</>
	);
}
