export class NotFoundException {
  statusCode: number = 404;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
