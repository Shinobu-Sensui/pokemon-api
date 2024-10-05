import { startServer, PORT, fastify } from './server.js';
import ajvPlugin from './plugins/ajv.js';
import routePlugin from './plugins/routes.js';
import { paginationAndSortPlugin } from './utils/paginationAndSortPlugin.js';

async function start() {
  try {
    await fastify.register(ajvPlugin);
    await fastify.register(paginationAndSortPlugin)
    await fastify.register(routePlugin);

    await startServer(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();

// Fonction pour logger et effacer
function logAndClear(message) {
  console.clear();
  console.log(message);
}


setInterval(() => {
  logAndClear(`Nouveau message: ${new Date().toISOString()}`);
}, 100000);