/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

import path from "path";
import axios from 'axios'
import PokemonRepository from './src/repositories/pokemon.js'

// Require the fastify framework and instantiate it
import Fastify from "fastify"

import fastifyStatic from "@fastify/static"

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let fastify = new Fastify()
// Setup our static files
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
import fastifyFormBody from "@fastify/formbody"
fastify.register(fastifyFormBody);

// View is a templating manager for fastify
import fastifyView from "@fastify/view"
import handlebars from "handlebars"
fastify.register(fastifyView, {
  engine: {
    handlebars: handlebars,
  },
});

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", function (request, reply) {
  // The Handlebars code will be able to access the parameter values and build them into the page
  console.log(JSON.stringify(request.body))
  let resp = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "fogo"
          ]
        }
      }
    ]
  }
  return reply.view('src/pages/index')
});

/**
 * Our POST route to handle and react to form submissions
 *
 * Accepts body data indicating the user choice
 */
fastify.post("/pokemon", async function (request, reply) {
  // The Handlebars code will be able to access the parameter values and build them into the page
  let repo = new PokemonRepository();

  let intent = request.body.queryResult.intent.displayName
  let pokemonName = request.body.queryResult.parameters.pokemon_name.toLowerCase();
  var res = ''

  switch (intent) {
    case 'poke_types':
      res = await repo.pokemonType(pokemonName)
      res = res.join(' e ')
      break
    case 'poke_evolutions':
      res = await repo.pokemonEvolutions(pokemonName)
      if (res.length < 1) {
        res = ["Não possui evoluções 😔"]
      }
      res = res.join(' e ')
  }

  let resp = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [res]
        }
      }
    ]
  }
  return JSON.stringify(resp);
});

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
  }
);
