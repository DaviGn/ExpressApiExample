import { IPresenter } from '.';

export class UnathorizedPresenter implements IPresenter {
    statusCode = 401;
    response: any;

    constructor(response: any) {
        this.response = response;
    }
}
