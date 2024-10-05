const DEFAULT_LANGUAGE = "fr";
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

function paginationAndSortPlugin(fastify, options, done) {
  fastify.decorateRequest("getPaginationAndSort", function () {
    const { sort, page, pageSize, ...query } = this.query;

    const sortOptions = parseSortOptions(sort);
    const pageNumber = parseInt(page) || DEFAULT_PAGE;
    const itemsPerPage = parseInt(pageSize) || DEFAULT_PAGE_SIZE;

    return { query, sortOptions, pageNumber, itemsPerPage };
  });

  // Ajout d'un hook pour s'assurer que la méthode est disponible
  fastify.addHook('onRequest', (request, reply, done) => {
    if (typeof request.getPaginationAndSort !== 'function') {
      fastify.log.error('getPaginationAndSort is not a function');
    }
    done();
  });

  done();
}

function parseSortOptions(sort) {
  if (!sort) return {};

  return Object.fromEntries(
    sort.split(",").map((param) => {
      const [field, order] = param.split(":");
      return [
        field,
        order && ["asc", "desc"].includes(order.toLowerCase())
          ? order.toLowerCase()
          : "asc",
      ];
    })
  );
}



export {
  DEFAULT_LANGUAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE,
  paginationAndSortPlugin
};