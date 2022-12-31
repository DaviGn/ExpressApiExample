import { Response } from 'express';
import { IPresenter } from '.';

export function processResult(res: Response, presenter: IPresenter) {
    return res.status(presenter.statusCode).json(presenter.response);
}
