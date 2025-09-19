const jwt = require("jsonwebtoken");
const Joi = require("joi");
const util = require("node:util");
const UnauthorizedException = require("../exception/unauthorizedException");

const verifyJwt = util.promisify(jwt.verify);
/**
 *
 * @param role {string[]}
 * @param jwt_type {string}
 * @returns {(function(e.Request, e.Response, e.NextFunction): void)}
 */
exports.authMiddleware = (role, jwt_type) => {
  return async (req, res, next) => {
    try {
      const auth_header = await Joi.string()
        .pattern(/^Bearer\s.+$/)
        .required()
        .messages({
          "string.empty": "Header token is required",
          "any.required": "Header token is required",
        })
        .validateAsync(req.headers.authorization);

      const token = await Joi.string()
        .required()
        .validateAsync(auth_header.split(" ")[1]);

      const payload = await verifyJwt(token, process.env.JWT_SECRET_KEY, {});

      if (payload.type !== jwt_type) {
        throw new UnauthorizedException("invalid token");
      }

      if (!role.includes(payload.role)) {
        throw new UnauthorizedException("invalid token");
      }
      res.locals.jwt = payload;
      next();
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        next(new UnauthorizedException("invalid token"));
        return;
      }
      next(e);
    }
  };
};
