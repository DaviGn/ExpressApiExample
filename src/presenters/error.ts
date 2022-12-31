import { IPresenter } from '.';

export class ErrorPresenter implements IPresenter {
    statusCode = 500;
    response: any;

    constructor(response?: any) {
        if (response) this.response = response;
    }
}
