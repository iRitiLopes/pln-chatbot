import Pokedex from 'pokedex-promise-v2'


export default class PokemonRepository {
    constructor() {
        this.pokedex = new Pokedex()
    }


    async pokemonType(pokemonName) {
        let types = await this.pokedex.getTypeByName(pokemonName);
        return types;
    }

    async pokemonMoves(pokemonName) {

    }
}