export default class Error401 extends Error {
  code: Number;

  constructor(message) {
    super(message);
    this.code = 401;
  }
}
