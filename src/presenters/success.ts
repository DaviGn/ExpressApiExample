import { IPresenter } from './';

export class SuccessPresenter implements IPresenter {
  statusCode: number = 200;
  response: any;

  constructor(response: any) {
    this.response = response;
  }
}
