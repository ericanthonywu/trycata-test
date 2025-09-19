const Joi = require("joi");

class env {
  constructor() {
    require("dotenv").config({ path: ".env" });
  }

  validate = async () => {
    process.env = await Joi.object({
      PORT: Joi.number().port().required(),
      DB_CONNECTION: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().port().required(),
      DB_USERNAME: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),
      DOG_API_BASE_URL: Joi.string().uri().required(),
      REDIS_HOST: Joi.string().required(),
      REDIS_PORT: Joi.number().port().required(),
      REDIS_TTL: Joi.number().positive().required(),
    })
      .unknown(true)
      .validateAsync(process.env);
  };
}

exports.env = env;
