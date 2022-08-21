import { FastifyReply, FastifyRequest } from 'fastify';
import {
  getPokemonEvolutions,
  getPokemonTypes,
  getPokemonImageUrl,
  getPokemonHeight,
  getPokemonWeight,
  getPokemonWeakness,
  getPokemonStats,
  getPokemonById,
} from '../pokemon/pokemon-repository';
import { DfIntent } from '../interfaces/dialogflow/df-intent';
import { DfWebhookRequest, Payload, Tweet } from '../interfaces/dialogflow/df-webhook-request';
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

import axios from 'axios';

export const dialogFlowWebhookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const dfWhReq = request.body as DfWebhookRequest;
  let pokemonName = ""
  const intent = { name: dfWhReq.queryResult.intent.displayName } as DfIntent;
  let response: DfWebhookImageResponse | DfWebhookTextResponse =
    buildTextResponse(quoteDefaultFallback());
  switch (intent.name) {
    case 'evolutions':
      pokemonName = toProperCase((dfWhReq.queryResult.parameters as Payload).pokemonName);
      await getPokemonEvolutions(pokemonName).then(
        (evolutions) =>
        (response = buildTextResponse(
          quoteEvolutions(pokemonName, evolutions)
        ))
      );
      break;
    case 'types':
      pokemonName = toProperCase((dfWhReq.queryResult.parameters as Payload).pokemonName);
      await getPokemonTypes(pokemonName).then(
        (types) =>
          (response = buildTextResponse(quoteTypes(pokemonName, types)))
      );
      break;
    case 'height':
      pokemonName = toProperCase((dfWhReq.queryResult.parameters as Payload).pokemonName);
      await getPokemonHeight(pokemonName).then(
        (height) =>
          (response = buildTextResponse(quoteHeight(pokemonName, height)))
      );
      break;
    case 'weight':
      pokemonName = toProperCase((dfWhReq.queryResult.parameters as Payload).pokemonName);
      await getPokemonWeight(pokemonName).then(
        (height) =>
          (response = buildTextResponse(quoteWeight(pokemonName, height)))
      );
      break;
    case 'weakness':
      pokemonName = toProperCase((dfWhReq.queryResult.parameters as Payload).pokemonName);
      await getPokemonWeakness(pokemonName).then(
        (weakness) =>
          (response = buildTextResponse(quoteWeakness(pokemonName, weakness)))
      );
      break;
    case 'stats':
      pokemonName = toProperCase((dfWhReq.queryResult.parameters as Payload).pokemonName);
      await getPokemonStats(pokemonName).then(
        (stats) =>
          (response = buildTextResponse(quoteStats(pokemonName, stats)))
      );
      break;
    case 'image':
      pokemonName = toProperCase((dfWhReq.queryResult.parameters as Payload).pokemonName);
      await getPokemonImageUrl(pokemonName).then(
        (imageUrl) => (response = buildImageResponse(imageUrl, pokemonName))
      );
      break;
    case 'tweet':
      let link = (dfWhReq.queryResult.parameters as Tweet).url
      let res = await axios.post("http://df68-34-125-132-146.ngrok.io/", { url: link }).then(x => x.data).catch(x => console.log(x));
      pokemonName = await getPokemonById(res['pokemon_id'])
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
