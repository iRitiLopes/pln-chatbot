const axios = require('axios')
const Pokedex = require('pokedex-promise-v2')

class PokemonRepository {
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

module.exports = PokemonRepository