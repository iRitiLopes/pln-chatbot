const axios = require('axios')

class PokemonRepository {
    constructor() {
        this.url = "https://pokeapi.co/api/v2/pokemon/"
    }


    async pokemonType(pokemonName) {
        let types = await axios
            .get(url + `${pokemonName}`)
            .then(res => {
                return res.data.types.map(x => x.type.name)
            })
            .catch(error => {
                console.error(error);
            });
        return types;
    }
}

module.exports = PokemonRepository