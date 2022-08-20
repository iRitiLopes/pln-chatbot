import { PokemonStats } from '../interfaces/pokemon/pokemon-stats';
import wiki from 'wikijs';
import { PokemonInfo } from '../interfaces/pokemon/pokemon-info';
import { normalizeArray, toProperCase } from '../utils/utils';

const pokeWiki = wiki({
  apiUrl: 'https://pokemon-go.fandom.com/pt-br/api.php',
});

export const runTests = async () => {
  const pokemon = 'Charizard';
  await getPokemonInfo(pokemon).then(console.log);
  await getPokemonEvolutions(pokemon).then(console.log);
  await getPokemonTypes(pokemon).then(console.log);
  await getPokemonHeight(pokemon).then(console.log);
  await getPokemonWeight(pokemon).then(console.log);
  await getPokemonWeakness(pokemon).then(console.log);
  await getPokemonStats(pokemon).then(console.log);
  await getPokemonImageUrl(pokemon).then(console.log);
};

const getPokemonInfo = async (pokemonName: string): Promise<PokemonInfo> => {
  return pokeWiki
    .page(pokemonName)
    .then((page) => page.info()) as Promise<PokemonInfo>;
};

export const getPokemonEvolutions = async (
  pokemonName: string
): Promise<string[]> => {
  const pokeInfo = await getPokemonInfo(pokemonName);
  let evolutions = normalizeArray([
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
  let types = normalizeArray([pokeInfo.type1, pokeInfo.type2]);
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

  return {
    attack: pokeInfo.attack && parseInt(pokeInfo.attack),
    captureRate: pokeInfo.capture && parseInt(pokeInfo.capture),
    cpRange: pokeInfo.cp && parseInt(pokeInfo.cp),
    defense: pokeInfo.defense && parseInt(pokeInfo.defense),
    fleeRate: pokeInfo.flee && parseInt(pokeInfo.flee),
    needEvolve: pokeInfo.needevolve && parseInt(pokeInfo.needevolve),
    stamina: pokeInfo.stamina && parseInt(pokeInfo.stamina),
  } as PokemonStats;
};

export const getPokemonImageUrl = async (
  pokemonName: string
): Promise<string> => {
  return pokeWiki
    .page(pokemonName)
    .then((page) =>
      page
        .mainImage()
        .then((imageUrl) => imageUrl.replace(/(.png).*/, '') + '.png')
    );
};
