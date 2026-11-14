import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto.js';
import {RequestParams} from '../request.params.type.js';
import {RequestBody} from '../request-body.type.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
