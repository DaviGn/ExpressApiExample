import { ConflictPresenter } from './conflict';
import { NotFoundPresenter } from './notFound';
import { SuccessPresenter } from './success';
import { DeletedPresenter } from './deleted';
import { processResult } from './result';
import { UnathorizedPresenter } from './unathorized';

interface IPresenter {
  statusCode: number;
  response: any;
}

export {
  ConflictPresenter,
  NotFoundPresenter,
  DeletedPresenter,
  SuccessPresenter,
  UnathorizedPresenter,
  IPresenter,
  processResult,
};
