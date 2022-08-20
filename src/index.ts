import fastify from 'fastify';
import { dialogFlowWebhookHandler } from './dialogflow/webhook-handler';
import { createReadStream } from 'fs';
import { runTests } from './pokemon/pokemon-repository';
import axios from 'axios';

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
server.get('/xd',  (request, reply) => {
  axios.get('localhost:5000/').then(x => x.data).catch( x => console.log("erro"));
});

server.listen({ host: '0.0.0.0', port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
