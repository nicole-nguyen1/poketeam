import { Select } from "@mantine/core";

export default function GymDropdown(): JSX.Element {
	return (
		<Select
			placeholder="Select gym"
			data={[]}
			// styles
			mb={16}
			w={"100%"}
		/>
	);
}
