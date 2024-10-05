import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import fastifyPlugin from "fastify-plugin";

function ajvPlugin(fastify, options, done) {
  const ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    strict: false,
  });

  ajvErrors(ajv);

  fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
    return ajv.compile(schema);
  });

  fastify.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      const errors = error.validation.map((err) => {
        return err.message.replace(/^querystring\./, "");
      });
      return reply.status(400).send({
        error: "Erreur de validation",
        details: errors,
      });
    }

    reply.send(error);
  });

  done();
}

export default fastifyPlugin(ajvPlugin);
