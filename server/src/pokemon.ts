interface GraphQLResponse {
  error: string | Error | null | undefined,
  data: Promise<any> | null | undefined,
}

import fetch from "node-fetch"

async function fetchPokemonGraphQL(query: string, operationName: string): Promise<GraphQLResponse>  {
  try {
    const result = await fetch(
      "https://beta.pokeapi.co/graphql/v1beta",
      {
        method: "POST",
        body: JSON.stringify({
          query: query,
          variables: {},
          operationName: operationName
        })
      }
    )
    console.log(result)

    const json = await result.json()
    return {
      error: null,
      data: json,
    }
  } catch (e: unknown) {
    console.log('catching error here?')
    if (e instanceof Error) {
      return {
        error: e,
        data: null
      }
    } else {
      return {
        error: `unknown error for ${operationName}`,
        data: null
      }
    }
  }

}

export async function fetchPokemon(): Promise<GraphQLResponse> {
  const query = `query samplePokeAPIquery {
    generations: pokemon_v2_generation {
      name
      pokemon_species: pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

  return await fetchPokemonGraphQL(query, 'fetchPokemon')
}