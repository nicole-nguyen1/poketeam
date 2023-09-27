import { forwardRef, useEffect, useMemo, useState } from "react";
import { Pokemons } from "../../PokeList";
import { Menu, Button, Box, Collapse, Group, Text, Flex } from "@mantine/core";
import {
	IconChevronDown,
	IconChevronRight,
	IconFilter,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import PokemonSearch from "../../PokemonSearch";
import PokemonTypeFilter from "./PokemonTypeFilter";
import PokemonEvolutionFilter from "./PokemonEvolutionFilter";

interface Props {
	pokedexID: number | null;
	pokemons: Array<Pokemons>;
	setFilteredPokemons: React.Dispatch<React.SetStateAction<Array<Pokemons>>>;
}

export default function PokemonFilterAndSearch({
	pokedexID,
	pokemons,
	setFilteredPokemons,
}: Props): JSX.Element {
	const [opened, { toggle }] = useDisclosure(false);

	return (
		<Box maw={400} mx="auto">
			<Group justify="space-between" mb={5}>
				<Button
					onClick={toggle}
					variant="light"
					leftSection={<IconFilter size={14} />}
					rightSection={
						opened ? (
							<IconChevronDown size="1rem" />
						) : (
							<IconChevronRight size="1rem" />
						)
					}
				>
					Filter
				</Button>
				<PokemonSearch
					pokemons={pokemons}
					setFilteredPokemons={setFilteredPokemons}
				/>
			</Group>
			<Collapse in={opened}>
				<PokemonTypeFilter
					pokemons={pokemons}
					setFilteredPokemons={setFilteredPokemons}
				/>
				<PokemonEvolutionFilter
					pokedexID={pokedexID}
					pokemons={pokemons}
					setFilteredPokemons={setFilteredPokemons}
				/>
			</Collapse>
		</Box>
	);
}
