export default class Error403 extends Error {
  code: Number;

  constructor(message) {
    super(message);
    this.code = 403;
  }
}
