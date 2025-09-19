const STATUS_CODE = require("../constant/statusCodeConstant");

class BadRequestException extends Error {
  status = STATUS_CODE.BAD_REQUEST;
}

module.exports = BadRequestException;
