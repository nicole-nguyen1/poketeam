"use client";

import { useState } from "react";
import { Header } from "./Header";
import GameDropdown from "./dropdowns/GameDropdown";
import PokeList, { Pokemons } from "./PokeList";
import GetPokemonButton from "./buttons/GetPokemonButton";
import { Container, Flex, Grid, Title } from "@mantine/core";

import classes from "./page.module.css";
import GymDropdown from "./dropdowns/GymDropdown";
import PokemonSearch from "./PokemonSearch";

export default function HomePage() {
	const [error, setError] = useState("");
	const [pokemons, setPokemons] = useState<Array<Pokemons>>([]);
	const [pokedexID, setPokedexID] = useState<number | null>(null);
	const [filteredPokemons, setFilteredPokemons] =
		useState<Array<Pokemons>>(pokemons);

	return (
		<>
			<Header />
			<Container size="lg" className={classes.inner}>
				<Grid>
					<Grid.Col span={4}>
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
								setFilteredPokemons={setFilteredPokemons}
							/>
						</Flex>
						<PokemonSearch
							pokemons={pokemons}
							setFilteredPokemons={setFilteredPokemons}
						/>
						{error != null && <p>{error}</p>}
						<PokeList pokemons={filteredPokemons} />
					</Grid.Col>
					<Grid.Col span={4}>
						<GymDropdown />
					</Grid.Col>
					<Grid.Col span={4}>
						<Title order={4}>Your Team hello</Title>
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
}
