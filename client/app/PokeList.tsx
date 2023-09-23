import { Avatar, Flex } from "@mantine/core";
import React from "react";

export interface Pokemons {
	id: string;
	pokedex_number: string;
	name: string;
	sprite?: string;
	types: Array<string>;
}

interface Props {
	pokemons: Array<Pokemons>;
}

function PokeList({ pokemons }: Props): JSX.Element {
	return (
		<Flex direction={{ base: "column", sm: "row" }} wrap={"wrap"}>
			{pokemons.map((pokemon) => (
				<Avatar
					key={pokemon.name}
					variant="light"
					radius="sm"
					size="xl"
					src={pokemon.sprite}
				/>
			))}
		</Flex>
	);
}

export default PokeList;
