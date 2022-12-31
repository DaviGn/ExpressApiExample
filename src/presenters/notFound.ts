import { IPresenter } from '.';

export class NotFoundPresenter implements IPresenter {
    statusCode = 404;
    response: any;

    constructor(response: any) {
        this.response = response;
    }
}
