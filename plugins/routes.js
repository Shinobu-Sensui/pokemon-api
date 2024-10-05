import fp from "fastify-plugin";
import pokedexRoutes from "../routes/pokedex/pokedexRoutes.js";

export default fp(
  async function (fastify, opts) {
    fastify.register(pokedexRoutes, { prefix: "/api/pokedex" });
    //fastify.register(itemRoutes, { prefix: '/api/items' });
  },
  { name: "routes" }
);
