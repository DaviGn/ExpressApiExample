import { IException } from './iException';

export class AuthException implements IException {
    statusCode = 401;
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}
