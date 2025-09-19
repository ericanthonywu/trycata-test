class ResponseUtil {
  #message = "Success";
  #data = null;
  #error = null;

  setData(data) {
    this.#data = data;
    return this;
  }

  setMessage(message) {
    this.#message = message;
    return this;
  }

  setError(error) {
    this.#error = error;
    return this;
  }

  toObject() {
    return {
      message: this.#message,
      data: this.#data,
      error: this.#error,
    };
  }
}

module.exports = ResponseUtil;
