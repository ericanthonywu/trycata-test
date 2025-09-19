const Joi = require("joi");

/**
 * General request validator
 *
 * @param key {keyof import('express').Request}
 * @param schema {Record<string, any>}
 * @returns {(function(e.Response, e.Request, e.NextFunction): Promise<void>)}
 */
const requestValidator = (key, schema) => {
  return async (req, res, next) => {
    try {
      req[key] = await Joi.object(schema)
        .options({
          abortEarly: false,
        })
        .validateAsync(req[key]);
      next();
    } catch (e) {
      next(e);
    }
  };
};

exports.bodyValidator = (schema) => requestValidator("body", schema);

exports.queryStringValidator = (schema) => requestValidator("query", schema);

exports.urlPathValidator = (schema) => requestValidator("params", schema);
