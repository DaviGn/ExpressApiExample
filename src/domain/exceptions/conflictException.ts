export class ConflictException {
    statusCode = 409;
    field: string;
    message: string;

    constructor(field: string, message: string) {
        this.field = field;
        this.message = message;
    }
}
