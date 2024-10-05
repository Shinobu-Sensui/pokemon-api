import { pokedexSearch } from '../../utils/pokedexSearch.js'

export default async function searchHandler(request, reply) {
  const { query, sortOptions, pageNumber, itemsPerPage } = request.getPaginationAndSort();

  const result = pokedexSearch(query, sortOptions, pageNumber, itemsPerPage);

  return result.data.length > 0
    ? result
    : reply.code(404).send({ error: "Aucun Pokémon trouvé" });
}