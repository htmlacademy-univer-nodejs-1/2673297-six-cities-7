import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import {HttpError} from '../error/http-error.js';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (typeof objectId !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Invalid parameter ${this.param}`,
        'ValidateObjectIdMiddleware'
      );
    }

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
