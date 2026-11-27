import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from './user-service.interface.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './login-user-request.type.js';
import {BaseController} from '../../libs/rest/controller/base-controller.abstract.js';
import {Component} from '../component.enum.js';
import {Logger} from '../../libs/logger/logger.interface.js';
import {RestSchema} from '../../libs/config/rest.schema.js';
import {Config} from '../../libs/config/config.interface.js';
import {HttpMethod} from '../http-method.enum.js';
import {fillDTO} from '../../helpers/common.js';
import {HttpError} from '../../libs/rest/error/http-error.js';
import {ValidateDtoMiddleware} from '../../libs/rest/middleware/validate-dto.middleware.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {LoginUserDto} from './dto/login-user.dto.js';
import {UploadFileMiddleware} from '../../libs/rest/middleware/upload-file.middleware.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatarPath'),
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { body } = req;
    const avatarPath = req.file?.path;

    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const userData = { ...body, avatarPath };
    const result = await this.userService.create(userData, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (! existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
