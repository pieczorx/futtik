class Exception extends Error {
  constructor(message, options) {
    super();
    Error.captureStackTrace(this, Exception);
  }
}
