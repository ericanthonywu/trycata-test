const STATUS_CODE = require("../constant/statusCodeConstant");

class UnauthorizedException extends Error {
  status = STATUS_CODE.UNAUTHORIZED;
}

module.exports = UnauthorizedException;
