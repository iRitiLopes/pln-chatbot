import PokemonRepository from './src/repositories/pokemon.js'

let repo = new PokemonRepository()
let res = await repo.pokemonEvolutions('elekid')
console.log(res);