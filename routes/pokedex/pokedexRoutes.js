import searchHandler from "../../handler/pokedex/searchHandler.js";
import searchSchema from "../../schemas/searchSchema.js";

export default async function pokedexRoutes(fastify, options) {
  fastify.get("/search", {
    schema: {
      querystring: searchSchema.querystring,
    },
    handler: searchHandler
  });
}
