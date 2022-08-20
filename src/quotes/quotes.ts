import { PokemonStats } from '../interfaces/pokemon/pokemon-stats';
import { getRandomChoice } from '../utils/utils';

export const quoteDefaultFallback = () =>
  getRandomChoice([
    'Desculpe, não sei responder sobre isso.',
    'Desculpe, não entendi.',
    'Desculpe, não consegui compreender.',
    'Desculpe, mas você pode tentar perguntar de outra forma?',
  ]);

export const quoteEvolutions = (
  pokemonName: string,
  pokemonEvolutions: string[]
) => {
  if (!pokemonEvolutions) return quoteDefaultFallback();
  const evolutionCount = pokemonEvolutions.length;
  if (evolutionCount > 1)
    return `As evoluções do ${pokemonName} são ${pokemonEvolutions
      .splice(0, evolutionCount - 1)
      .join(', ')} e ${pokemonEvolutions[evolutionCount - 2]}.`;
  else return `O ${pokemonName} não possui evoluções.`;
};

export const quoteTypes = (pokemonName: string, pokemonTypes: string[]) => {
  if (!pokemonTypes) return quoteDefaultFallback();
  const typeCount = pokemonTypes.length;
  if (typeCount > 1)
    return `Os tipos do ${pokemonName} são ${pokemonTypes
      .splice(0, typeCount - 1)
      .join(', ')} e ${pokemonTypes[typeCount - 2]}.`;
  else return `O ${pokemonName} não possui tipos.`;
};

export const quoteHeight = (
  pokemonName: string,
  pokemonHeight: string | undefined
) => {
  if (!pokemonHeight) return quoteDefaultFallback();
  return `O ${pokemonName} tem ${pokemonHeight} de altura.`;
};

export const quoteWeight = (
  pokemonName: string,
  pokemonWeight: string | undefined
) => {
  if (!pokemonWeight) return quoteDefaultFallback();
  return `O ${pokemonName} pesa ${pokemonWeight}.`;
};

export const quoteWeakness = (
  pokemonName: string,
  pokemonWeakness: string | undefined
) => {
  if (!pokemonWeakness) return quoteDefaultFallback();
  return `O ${pokemonName} é fraco contra ${pokemonWeakness}.`;
};

export const quoteStats = (pokemonName: string, pokemonStats: PokemonStats) => {
  if (!pokemonStats) return quoteDefaultFallback();
  return `Algumas informações sobre o ${pokemonName}:
  • Estatísticas de Combate
  • -- Ataque: ${pokemonStats.attack}
  • -- Defesa: ${pokemonStats.defense}
  • -- Vigor: ${pokemonStats.stamina}
  • -- Alcance CP: ${pokemonStats.cpRange}

  • Estatísticas de Captura
  • -- Taxa de Captura: ${pokemonStats.captureRate}%
  • -- Taxa de Evasão: ${pokemonStats.fleeRate}%

  • Informações de Evolução
  • -- Doces Necessário para Evoluir: ${pokemonStats.needEvolve}
  `;
};
