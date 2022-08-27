import fastify from 'fastify';
// import { load } from 'ts-dotenv';
import { createReadStream } from 'fs';
import path from 'path';
import { dialogFlowWebhookHandler } from './dialogflow/webhook-handler';
// import { runTests } from './pokemon/pokemon-repository';

// runTests().then((_) => {
//   process.exit(0);
// });

// const env = load({
//   PORT: Number,

// }, path.join(__dirname, '/../.env'));

const server = fastify();

server.get('/', (request, reply) => {
  void reply
    .type('text/html')
    .send(createReadStream(path.join(__dirname, '/../public/index.html')));
});

server.post('/chatbot-dialogflow-webhook', dialogFlowWebhookHandler);

server.listen(
  { host: '0.0.0.0', port: Number(process.env.PORT) },
  (err, address) => {
    if (err != null) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
);
