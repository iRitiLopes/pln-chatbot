import PokemonRepository from './src/repositories/pokemon.js'
import TypeTranslate from './src/services/translate/types.js'
let repo = new PokemonRepository()
let res = await repo.pokemonType('dragonite')
console.log(res);

console.log(TypeTranslate.translate('fire'));

console.log(await repo.moves('charmander'))