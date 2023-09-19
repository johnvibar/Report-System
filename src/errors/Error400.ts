export default class Error400 extends Error {
  code: Number;

  constructor(message) {
    super(message);
    this.code = 400;
  }
}
