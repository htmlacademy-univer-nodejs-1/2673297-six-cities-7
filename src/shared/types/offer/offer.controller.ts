import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {BaseController} from '../../libs/rest/controller/base-controller.abstract.js';
import {Component} from '../component.enum.js';
import {Logger} from '../../libs/logger/logger.interface.js';
import {HttpMethod} from '../http-method.enum.js';
import {fillDTO} from '../../helpers/common.js';
import {OfferService} from './offer-service.interface.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {HttpError} from '../../libs/rest/error/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {FullOfferRdo} from './rdo/full.offer.rdo.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {CityName} from '../city.enum.js';
import {ValidateObjectIdMiddleware} from '../../libs/rest/middleware/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../libs/rest/middleware/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../libs/rest/middleware/document-exists.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });

    this.addRoute({
      path: '/:id',
      method: HttpMethod.Get,
      handler: this.get,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });

    this.addRoute({
      path: '/:id',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });

    this.addRoute({
      path: '/:id',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const responseData = fillDTO(OfferRdo, result);
    this.created(res, responseData);
  }

  public async get(_req: Request, res: Response): Promise<void> {
    const { id } = _req.params;
    if (typeof id !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offer id',
        'OfferController',
      );
    }
    const offers = await this.offerService.findById(id);
    if (!offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OfferController',
      );
    }
    const responseData = fillDTO(FullOfferRdo, offers);
    this.ok(res, responseData);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (typeof id !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offer id',
        'OfferController',
      );
    }
    const body = req.body as UpdateOfferDto;
    const result = await this.offerService.updateById(id, body);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async delete(_req: Request, res: Response): Promise<void> {
    const { id } = _req.params;
    if (typeof id !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offer id',
        'OfferController',
      );
    }
    const offer = await this.offerService.deleteById(id);
    const responseData = fillDTO(FullOfferRdo, offer);
    this.noContent(res, responseData);
  }

  public async premiumIndex(_req: Request, res: Response): Promise<void> {
    const { city } = _req.params;
    if (!Object.values(CityName).includes(city as CityName)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid city',
        'OfferController',
      );
    }
    const offers = await this.offerService.findPremiumByCity(city as CityName);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

}
