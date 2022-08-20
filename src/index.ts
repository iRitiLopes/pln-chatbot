import fastify from 'fastify';
import { dialogFlowWebhookHandler } from './dialogflow/webhook-handler';
import { createReadStream } from 'fs';
import { runTests } from './pokemon/pokemon-repository';

// runTests().then((_) => {
//   process.exit(0);
// });

const server = fastify();

server.get('/', (request, reply) => {
  reply
    .type('text/html')
    .send(createReadStream(__dirname + '/../public/index.html'));
});

server.post('/chatbot-dialogflow-webhook', dialogFlowWebhookHandler);

server.listen({ host: '0.0.0.0', port: process.env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
