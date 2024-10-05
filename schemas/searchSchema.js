export default {
  querystring: {
    type: "object",
    properties: {
      generation: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: "La génération doit être un nombre entier.",
          minimum: "La génération doit être supérieure ou égale à 1.",
        },
      },
      category: {
        type: "string",
        errorMessage: {
          type: "La catégorie doit être une chaîne de caractères.",
        },
      },
      name: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: "Le nom doit être une chaîne de caractères.",
          minLength: "Le nom ne peut pas être vide.",
        },
      },
      sort: {
        type: "string",
        pattern: "^[a-zA-Z]+(:[a-z]+)?(,[a-zA-Z]+(:[a-z]+)?)*$",
        errorMessage: {
          type: "Le tri doit être une chaîne de caractères.",
          pattern: "Le format de tri doit être 'champ:ordre' (ex: name:asc,generation:desc).",
        },
      },
      language: {
        type: "string",
        enum: ["fr", "jp", "en"],
        errorMessage: {
          enum: "La langue doit être 'fr', 'jp' ou 'en'.",
        },
      },
      type_includes: {
        type: "string",
        pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
        errorMessage: {
          pattern: "Le type_includes doit être un ou plusieurs types séparés par des virgules, sans espaces (ex: feu,eau).",
        },
      },
      type_match: {
        type: "string",
        pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
        errorMessage: {
          pattern: "Le type_match doit être un ou plusieurs types séparés par des virgules, sans espaces (ex: feu,eau).",
        },
      },
      talent_includes: {
        type: "string",
        pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
        errorMessage: {
          pattern: "Le talent_includes doit être un ou plusieurs talents séparés par des virgules, sans espaces (ex: force,vitesse).",
        },
      },
      talent_match: {
        type: "string",
        pattern: "^[a-zA-Z]+(,[a-zA-Z]+)*$",
        errorMessage: {
          pattern: "Le talent_match doit être un ou plusieurs talents séparés par des virgules, sans espaces (ex: force,vitesse).",
        },
      },
      page: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: "Le numéro de page doit être un entier.",
          minimum: "Le numéro de page doit être supérieur ou égal à 1.",
        },
      },
      pageSize: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        errorMessage: {
          type: "La taille de page doit être un entier.",
          minimum: "La taille de page doit être supérieure ou égale à 1.",
          maximum: "La taille de page ne doit pas dépasser 100.",
        },
      },
    },
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "Les propriétés supplémentaires ne sont pas autorisées dans la requête.",
    },
  },
};