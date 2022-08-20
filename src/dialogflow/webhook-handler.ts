import { FastifyReply, FastifyRequest } from 'fastify';
import {
  getPokemonEvolutions,
  getPokemonTypes,
  getPokemonImageUrl,
  getPokemonHeight,
  getPokemonWeight,
  getPokemonWeakness,
  getPokemonStats,
} from '../pokemon/pokemon-repository';
import { DfIntent } from '../interfaces/dialogflow/df-intent';
import { DfWebhookRequest } from '../interfaces/dialogflow/df-webhook-request';
import { DfWebhookTextResponse } from '../interfaces/dialogflow/df-webhook-text-response copy';
import { DfWebhookImageResponse } from '../interfaces/dialogflow/df-webhook-image-response';
import {
  quoteDefaultFallback,
  quoteEvolutions,
  quoteHeight,
  quoteStats,
  quoteTypes,
  quoteWeakness,
  quoteWeight,
} from '../quotes/quotes';
import { toProperCase } from '../utils/utils';

export const dialogFlowWebhookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const dfWhReq = request.body as DfWebhookRequest;
  const intent = { name: dfWhReq.queryResult.intent.displayName } as DfIntent;
  const pokemonName = toProperCase(dfWhReq.queryResult.parameters.pokemonName);
  let response: DfWebhookImageResponse | DfWebhookTextResponse =
    buildTextResponse(quoteDefaultFallback());
  switch (intent.name) {
    case 'evolutions':
      await getPokemonEvolutions(pokemonName).then(
        (evolutions) =>
          (response = buildTextResponse(
            quoteEvolutions(pokemonName, evolutions)
          ))
      );
      break;
    case 'types':
      await getPokemonTypes(pokemonName).then(
        (types) =>
          (response = buildTextResponse(quoteTypes(pokemonName, types)))
      );
      break;
    case 'height':
      await getPokemonHeight(pokemonName).then(
        (height) =>
          (response = buildTextResponse(quoteHeight(pokemonName, height)))
      );
      break;
    case 'weight':
      await getPokemonWeight(pokemonName).then(
        (height) =>
          (response = buildTextResponse(quoteWeight(pokemonName, height)))
      );
      break;
    case 'weakness':
      await getPokemonWeakness(pokemonName).then(
        (weakness) =>
          (response = buildTextResponse(quoteWeakness(pokemonName, weakness)))
      );
      break;
    case 'stats':
      await getPokemonStats(pokemonName).then(
        (stats) =>
          (response = buildTextResponse(quoteStats(pokemonName, stats)))
      );
      break;
    case 'image':
      await getPokemonImageUrl(pokemonName).then(
        (imageUrl) => (response = buildImageResponse(imageUrl, pokemonName))
      );
      break;
  }
  reply.send(response);
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
