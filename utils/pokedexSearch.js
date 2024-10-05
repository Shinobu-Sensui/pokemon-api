import { pokeData } from "./loadData.js";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_LANGUAGE } from "./paginationAndSortPlugin.js";

const getSortValue = (pokemon, key, language) => {
  switch (key) {
    case "name": return pokemon.name[language].toLowerCase();
    case "generation": return pokemon.generation;
    case "category": return pokemon.category.toLowerCase();
    default: return pokemon[key];
  }
};

const filters = {
  name: (pokemon, value, language) => 
    pokemon.name[language].toLowerCase().includes(value.toLowerCase()),
  generation: (pokemon, value) => pokemon.generation == value,
  category: (pokemon, value) => 
    pokemon.category.toLowerCase().includes(value.toLowerCase()),
  type_includes: (pokemon, types) => 
    pokemon.types && types.some(type => 
      pokemon.types.some(t => t.name.toLowerCase() === type)
    ),
  type_match: (pokemon, types) => 
    pokemon.types && types.every(type => 
      pokemon.types.some(t => t.name.toLowerCase() === type)
    ),
  talent_includes: (pokemon, talents) => 
    pokemon.talents && talents.some(talent => 
      pokemon.talents.some(t => t.name.toLowerCase().includes(talent))
    ),
  talent_match: (pokemon, talents) => 
    pokemon.talents && talents.every(talent => 
      pokemon.talents.some(t => t.name.toLowerCase().includes(talent))
    ),
};

function pokedexSearch(query, sort = {}, page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) {
  const language = query.language || DEFAULT_LANGUAGE;
  
  let result = pokeData.pokedex.filter(pokemon => 
    Object.entries(query).every(([key, value]) => {
      if (key === "language") return true;
      const filter = filters[key];
      if (!filter) return true;
      
      const processedValue = (key.includes("type") || key.includes("talent"))
        ? value.toLowerCase().split(",").map(v => v.trim())
        : value;
      
      return filter(pokemon, processedValue, language);
    })
  );

  if (Object.keys(sort).length > 0) {
    result.sort((a, b) => {
      for (const [key, order] of Object.entries(sort)) {
        const aValue = getSortValue(a, key, language);
        const bValue = getSortValue(b, key, language);
        if (aValue !== bValue) {
          return (aValue < bValue ? -1 : 1) * (order === "asc" ? 1 : -1);
        }
      }
      return 0;
    });
  }

  const totalCount = result.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const paginatedResult = result.slice((page - 1) * pageSize, page * pageSize);

  console.log(`Total results: ${totalCount}, Page ${page} of ${totalPages}`);

  return {
    totalCount,
    page,
    pageSize,
    totalPages,
    data: paginatedResult
  };
}


export { pokedexSearch, DEFAULT_LANGUAGE, DEFAULT_PAGE, DEFAULT_PAGE_SIZE };