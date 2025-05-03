export class SquareRootError extends Error {
    constructor(value: number) {
      const message = `Cannot calculate the square root of a negative number: ${value}`;
      super(message);          // Call the parent Error constructor with the message
      this.name = this.constructor.name;  // Set the error name to 'SquareRootError'
    }
}
    