import {inject, injectable} from 'inversify';
import {BaseController} from '../../libs/rest/controller/base-controller.abstract.js';
import {Component} from '../component.enum.js';
import {Logger} from '../../libs/logger/logger.interface.js';
import {CommentService} from './comment-service.interface.js';
import {OfferService} from '../offer/offer-service.interface.js';
import {HttpMethod} from '../http-method.enum.js';
import {CreateCommentRequest} from './create-comment-request.type.js';
import {StatusCodes} from 'http-status-codes';
import {HttpError} from '../../libs/rest/error/http-error.js';
import {fillDTO} from '../../helpers/common.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {Request, Response} from 'express';
import {OfferRdo} from '../offer/rdo/offer.rdo.js';
import {ValidateObjectIdMiddleware} from '../../libs/rest/middleware/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../libs/rest/middleware/validate-dto.middleware.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const { id } = _req.params;
    if (typeof id !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offer id',
        'CommentController',
      );
    }
    const comments = await this.commentService.findByOfferId(id);
    const responseData = fillDTO(OfferRdo, comments);
    this.ok(res, responseData);
  }
}
