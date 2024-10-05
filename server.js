import Fastify from "fastify";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});
const PORT = process.env.PORT || 3000;

async function startServer(port) {
  try {
    await fastify.listen({ port });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

const closeGracefully = async (signal) => {
  fastify.log.info(`Réception du signal ${signal}, fermeture du serveur...`);
  await Promise.race([
    fastify.close(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout lors de la fermeture")), 5000)
    ),
  ]);
  process.exit(0);
};

process.on("SIGINT", () => closeGracefully("SIGINT"));
process.on("SIGTERM", () => closeGracefully("SIGTERM"));

export { startServer, PORT, fastify };
