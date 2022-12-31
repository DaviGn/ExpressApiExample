import { IPresenter } from '.';

export class CreatedPresenter implements IPresenter {
    statusCode = 201;
    response: any;

    constructor(response: any) {
        this.response = response;
    }
}
