interface GraphQLResponse<T> {
	error: string | Error | null;
	data: T | null;
}

export async function fetchPokeAPIData<T>(
	query: string,
	operationName: string,
	variables: {} = {}
): Promise<GraphQLResponse<T>> {
	try {
		console.log(`trying to fetch ${operationName}`);
		const response = fetch("https://beta.pokeapi.co/graphql/v1beta", {
			credentials: "omit",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify({
				query,
				operationName: operationName,
				variables,
			}),
			method: "POST",
		}).then<T>((response) => response.json());

		return { error: null, data: await response };
	} catch (e: unknown) {
		console.log("there is an error of some sort");
		if (e instanceof Error) {
			return {
				error: e,
				data: null,
			};
		} else {
			return {
				error: `unknown error for ${operationName}`,
				data: null,
			};
		}
	}
}
