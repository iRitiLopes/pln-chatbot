import axios from 'axios';
import { Tweet } from '../interfaces/app/tweet';
import wiki from 'wikijs';
import { PokemonInfo } from '../interfaces/pokemon/pokemon-info';
import { PokemonStats } from '../interfaces/pokemon/pokemon-stats';
import { normalizeArray, toProperCase } from '../utils/utils';

const pokeWiki = wiki({
  apiUrl: 'https://pokemon-go.fandom.com/pt-br/api.php',
});

const NOTEBOOK_URL = process.env.URL != null ? process.env.URL : 'http://c7bf-35-194-67-149.ngrok.io/';

export const runTests = async (): Promise<void> => {
  const pokemon = 'Charizard';
  const id = 1;
  await getPokemonById(id).then(console.log);
  await getPokemonInfo(pokemon).then(console.log);
  await getPokemonEvolutions(pokemon).then(console.log);
  await getPokemonTypes(pokemon).then(console.log);
  await getPokemonHeight(pokemon).then(console.log);
  await getPokemonWeight(pokemon).then(console.log);
  await getPokemonWeakness(pokemon).then(console.log);
  await getPokemonStats(pokemon).then(console.log);
  await getPokemonImageUrl(pokemon).then(console.log);
};

export const getPokemonById = async (pokemonId: number): Promise<string> => {
  return await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((x) => x.data.name)
    .catch(console.log);
};

const getPokemonInfo = async (pokemonName: string): Promise<PokemonInfo> => {
  return await (pokeWiki
    .page(pokemonName)
    .then(async (page) => await page.info()) as Promise<PokemonInfo>);
};

export const getPokemonEvolutions = async (
  pokemonName: string
): Promise<string[]> => {
  const pokeInfo = await getPokemonInfo(pokemonName);
  const evolutions = normalizeArray([
    pokeInfo.stage1,
    pokeInfo.stage2,
    pokeInfo.stage3,
  ]).filter((v) => v !== toProperCase(pokemonName));
  return evolutions
    .map((evo) => toProperCase(evo))
    .filter((evo) => evo !== toProperCase(pokemonName))
    .reverse();
};

export const getPokemonTypes = async (
  pokemonName: string
): Promise<string[]> => {
  const pokeInfo = await getPokemonInfo(pokemonName);
  const types = normalizeArray([pokeInfo.type1, pokeInfo.type2]);
  return types.map((type) => toProperCase(type));
};

export const getPokemonHeight = async (
  pokemonName: string
): Promise<string | undefined> => {
  const pokeInfo = await getPokemonInfo(pokemonName);
  return pokeInfo.height;
};

export const getPokemonWeight = async (
  pokemonName: string
): Promise<string | undefined> => {
  const pokeInfo = await getPokemonInfo(pokemonName);
  return pokeInfo.weight;
};

export const getPokemonWeakness = async (
  pokemonName: string
): Promise<string | undefined> => {
  const pokeInfo = await getPokemonInfo(pokemonName);
  return pokeInfo.weak;
};

export const getPokemonStats = async (
  pokemonName: string
): Promise<PokemonStats> => {
  const pokeInfo = await getPokemonInfo(pokemonName);
  const pokeStats: PokemonStats = {
    attack: (pokeInfo.attack != null) ? parseInt(pokeInfo.attack) : 0,
    captureRate: (pokeInfo.capture != null) ? parseInt(pokeInfo.capture) : 0,
    cpRange: (pokeInfo.cp != null) ? parseInt(pokeInfo.cp) : 0,
    defense: (pokeInfo.defense != null) ? parseInt(pokeInfo.defense) : 0,
    fleeRate: (pokeInfo.flee != null) ? parseInt(pokeInfo.flee) : 0,
    needEvolve: (pokeInfo.needevolve != null) ? parseInt(pokeInfo.needevolve) : 0,
    stamina: (pokeInfo.stamina != null) ? parseInt(pokeInfo.stamina) : 0,
  };

  return pokeStats;
};

export const getPokemonImageUrl = async (
  pokemonName: string
): Promise<string> => {
  return await pokeWiki
    .page(pokemonName)
    .then(async (page) =>
      await page
        .mainImage()
        .then((imageUrl) => imageUrl.replace(/(.png).*/, '') + '.png')
    );
};

export const getPokemonIdByTweet = async (tweet: Tweet): Promise<number> => {
  let id = 0;
  await axios
    .post(NOTEBOOK_URL, { url: tweet.url })
    .then(res => { id = res.data.pokemon_id; });
  return id;
};
