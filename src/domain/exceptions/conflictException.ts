export class ConflictException {
  statusCode: number = 409;
  field: string;
  message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}
