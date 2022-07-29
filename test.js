import PokemonRepository from './src/repositories/pokemon.js'

let repo = new PokemonRepository()
let res = await repo.pokemonType('dragonite')
console.log(res);