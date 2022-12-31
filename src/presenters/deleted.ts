import { IPresenter } from '.';

export class DeletedPresenter implements IPresenter {
    statusCode = 204;
    response: any;

    constructor(response?: any) {
        if (response) this.response = response;
    }
}
