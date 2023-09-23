import {
	Checkbox,
	Collapse,
	Divider,
	Grid,
	Group,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
	filterType: string;
	filterItems: Array<string>;
	selectedFilters: Set<string>;
	setSelectedFilters: Dispatch<SetStateAction<Set<string>>>;
}

export default function FilterBase({
	filterType,
	filterItems,
	selectedFilters,
	setSelectedFilters,
}: Props): JSX.Element {
	const [opened, { toggle }] = useDisclosure(false);
	const tempSelected: Set<string> = new Set(selectedFilters);

	const onChange = (val: string) => {
		if (tempSelected.has(val)) {
			tempSelected.delete(val);
		} else {
			tempSelected.add(val);
		}
		setSelectedFilters(tempSelected);
	};

	return (
		<Paper shadow="xs" radius="md" withBorder mt={12}>
			<Stack>
				<Group onClick={toggle} justify="space-between" pt={14} pl={14} pr={14}>
					<Title size={12}>{filterType}</Title>
					{opened ? (
						<IconChevronDown size="1rem" />
					) : (
						<IconChevronRight size="1rem" />
					)}
				</Group>
				<Divider />
				<Collapse in={opened} p="md">
					<Grid>
						{filterItems.map((item) => (
							<Grid.Col span={4} key={item}>
								<Checkbox
									label={item}
									value={item}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										onChange(e.target.value);
									}}
								/>
							</Grid.Col>
						))}
					</Grid>
				</Collapse>
			</Stack>
		</Paper>
	);
}
