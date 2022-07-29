import Pokedex from 'pokedex-promise-v2'


export default class PokemonRepository {
    constructor() {
        this.pokedex = new Pokedex()
    }


    async pokemonType(pokemonName) {
        let types = await this.pokedex.getPokemonByName(pokemonName).then(x => x.types.map(p => p.type.name)).catch(e => console.log(e));
        return types;
    }

    async pokemonEvolutions(pokemonName) {
        let evolutionChain = await this.pokedex.getEvolutionChainById(await this.evoltionChainId(pokemonName))
        let chain = evolutionChain.chain;

        let evolution = this.getEvolution(chain.evolves_to)
        return evolution
    }

    getEvolution(evo) {
        let evos = []
        for (var pokemon in evo) {
            evos.push(evo[pokemon].species.name)
            if (evo[pokemon].evolves_to.length > 0) {
                evos.push(...this.getEvolution(evo[pokemon].evolves_to))
            }
        }
        return evos
    }


    async pokemon(pokemonName) {
        return await this.pokedex.getPokemonByName(pokemonName).then(x => x).catch((e) => console.log(e))
    }

    async evoltionChainId(pokemonName) {
        let pokemonSpecie = await this.pokedex.getPokemonSpeciesByName(pokemonName)
        let evolutionChainId = pokemonSpecie.evolution_chain['url']
        return evolutionChainId.split('/').slice(-2)[0]
    }
}