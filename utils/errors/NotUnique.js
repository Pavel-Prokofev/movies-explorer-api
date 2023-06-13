class NotUnique extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotUnique';
    this.statusCode = 409;
  }
}

module.exports = NotUnique;
