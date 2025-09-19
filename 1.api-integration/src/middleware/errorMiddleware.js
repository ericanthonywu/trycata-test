const STATUS_CODE = require("../constant/statusCodeConstant");
const ResponseUtil = require("../util/responseUtil");
const loggerUtil = require("../util/loggerUtil");
const { slackAlertUtil } = require("../util/slackAlertUtil");
const rTracer = require("cls-rtracer");
const BadRequestException = require("../exception/badRequestException");

/**
 *
 * @param error {BadRequestException | Error | UnauthorizedException | Joi.ValidationError}
 * @param req {e.Request}
 * @param res {e.Response}
 * @param next {e.NextFunction}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  const error_response = {
    message: error.message,
    details: error.details ?? error,
    trace_id: rTracer.id(),
  };
  res.statusCode = error.status ?? STATUS_CODE.INTERNAL_SERVER_ERROR;

  switch (error.constructor.name) {
    case BadRequestException.constructor.name:
      error_response.message = "Bad Request";
      error_response.details = error.message.split(",");
      break;
  }

  if (error.isJoi) {
    res.statusCode = STATUS_CODE.BAD_REQUEST;
    error_response.details = error.details.map(({ message }) => message);
    error_response.message =
      "Some Request is not fulfilling the current requirement";
  }

  if (res.statusCode >= STATUS_CODE.INTERNAL_SERVER_ERROR) {
    slackAlertUtil(
      `trace id: ${rTracer.id()}, error occurred: ${error}, \n stack: ${error.stack}`,
    );
    loggerUtil.error(`error occurred: ${error} \n stack: ${error.stack}`);
  }

  if (process.env.NODE_ENV === "production") {
    error_response.details = {
      trace_id: rTracer.id(),
    };
  }

  res.json(
    new ResponseUtil()
      .setError(error_response)
      .setMessage("an error occurred check log for details")
      .toObject(),
  );
};
