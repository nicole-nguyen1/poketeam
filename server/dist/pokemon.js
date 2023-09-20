"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPokemon = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function fetchPokemonGraphQL(query, operationName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, node_fetch_1.default)("https://beta.pokeapi.co/graphql/v1beta", {
                method: "POST",
                body: JSON.stringify({
                    query: query,
                    variables: {},
                    operationName: operationName
                })
            });
            console.log(result);
            const json = yield result.json();
            return {
                error: null,
                data: json,
            };
        }
        catch (e) {
            console.log('catching error here?');
            if (e instanceof Error) {
                return {
                    error: e,
                    data: null
                };
            }
            else {
                return {
                    error: `unknown error for ${operationName}`,
                    data: null
                };
            }
        }
    });
}
function fetchPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
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
`;
        return yield fetchPokemonGraphQL(query, 'fetchPokemon');
    });
}
exports.fetchPokemon = fetchPokemon;
