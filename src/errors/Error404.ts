export default class Error404 extends Error {
  code: Number;

  constructor(message) {
    super(message);
    this.code = 404;
  }
}
