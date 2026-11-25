import { Request } from 'express';
import {RequestParams} from '../request.params.type.js';
import {RequestBody} from '../request-body.type.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;
