import { FastifyReply, FastifyRequest } from 'fastify';
import { DfWebhookImageResponse } from '../interfaces/dialogflow/df-webhook-image-response';
import {
  DfWebhookRequest,
  Payload
} from '../interfaces/dialogflow/df-webhook-request';
import { DfWebhookTextResponse } from '../interfaces/dialogflow/df-webhook-text-response copy';
import {
  getPokemonById,
  getPokemonEvolutions,
  getPokemonHeight,
  getPokemonIdByTweet,
  getPokemonImageUrl,
  getPokemonStats,
  getPokemonTypes,
  getPokemonWeakness,
  getPokemonWeight
} from '../pokemon/pokemon-repository';
import {
  quoteDefaultFallback,
  quoteEvolutions,
  quoteHeight,
  quoteStats,
  quoteTypes,
  quoteWeakness,
  quoteWeight
} from '../quotes/quotes';
import { DfIntent } from '../types/dialogflow/df-intent';
import { toProperCase } from '../utils/utils';

import { Tweet } from '../interfaces/app/tweet';

export const dialogFlowWebhookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const dfWhReq = request.body as DfWebhookRequest;
  let pokemonName = '';
  const intent = dfWhReq.queryResult.intent.displayName as DfIntent;
  let response: DfWebhookImageResponse | DfWebhookTextResponse =
    buildTextResponse(quoteDefaultFallback());
  switch (intent) {
    case 'evolutions':
      pokemonName = toProperCase(
        (dfWhReq.queryResult.parameters as Payload).pokemonName
      );
      await getPokemonEvolutions(pokemonName).then(
        (evolutions) =>
        (response = buildTextResponse(
          quoteEvolutions(pokemonName, evolutions)
        ))
      );
      break;
    case 'types':
      pokemonName = toProperCase(
        (dfWhReq.queryResult.parameters as Payload).pokemonName
      );
      await getPokemonTypes(pokemonName).then(
        (types) =>
          (response = buildTextResponse(quoteTypes(pokemonName, types)))
      );
      break;
    case 'height':
      pokemonName = toProperCase(
        (dfWhReq.queryResult.parameters as Payload).pokemonName
      );
      await getPokemonHeight(pokemonName).then(
        (height) =>
          (response = buildTextResponse(quoteHeight(pokemonName, height)))
      );
      break;
    case 'weight':
      pokemonName = toProperCase(
        (dfWhReq.queryResult.parameters as Payload).pokemonName
      );
      await getPokemonWeight(pokemonName).then(
        (height) =>
          (response = buildTextResponse(quoteWeight(pokemonName, height)))
      );
      break;
    case 'weakness':
      pokemonName = toProperCase(
        (dfWhReq.queryResult.parameters as Payload).pokemonName
      );
      await getPokemonWeakness(pokemonName).then(
        (weakness) =>
          (response = buildTextResponse(quoteWeakness(pokemonName, weakness)))
      );
      break;
    case 'stats':
      pokemonName = toProperCase(
        (dfWhReq.queryResult.parameters as Payload).pokemonName
      );
      await getPokemonStats(pokemonName).then(
        (stats) =>
          (response = buildTextResponse(quoteStats(pokemonName, stats)))
      );
      break;
    case 'image':
      pokemonName = toProperCase(
        (dfWhReq.queryResult.parameters as Payload).pokemonName
      );
      await getPokemonImageUrl(pokemonName).then(
        (imageUrl) => (response = buildImageResponse(imageUrl, pokemonName))
      );
      break;
    case 'tweet': {
      const tweet: Tweet = (dfWhReq.queryResult.parameters as Tweet);
      const pokeId = await getPokemonIdByTweet(tweet);
      pokemonName = await getPokemonById(pokeId);
      await getPokemonImageUrl(pokemonName).then(
        (imageUrl) => (response = buildImageResponse(imageUrl, pokemonName))
      );
      break;
    }
  }
  try {
    await reply.send(response);
  } catch (e) {
    console.log(e);
  }

};

const buildTextResponse = (text: string): DfWebhookTextResponse => {
  return {
    fulfillmentMessages: [
      {
        text: {
          text: [text],
        },
      },
    ],
  };
};

const buildImageResponse = (
  imageUrl: string,
  accessibilityText: string
): DfWebhookImageResponse => {
  return {
    fulfillmentMessages: [
      {
        payload: {
          richContent: [
            [
              {
                type: 'image',
                rawUrl: imageUrl,
                accessibilityText: `Foto do ${accessibilityText}.`,
              },
            ],
          ],
        },
      },
    ],
  };
};
