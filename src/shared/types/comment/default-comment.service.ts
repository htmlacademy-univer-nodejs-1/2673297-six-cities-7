import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import {Component} from '../component.enum';
import {MAX_COMMENT_COUNT} from './comment.constant';
import {SortType} from '../sort-type.enum';
import {OfferEntity} from '../offer/offer.entity';
import { Types } from 'mongoose';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.recalculateOfferRating(dto.offerId);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .sort({ createdAt: SortType.Down })
      .limit(MAX_COMMENT_COUNT)
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }

  public async getCountByOfferId(offerId: string): Promise<number> {
    return this.commentModel.countDocuments({ offerId }).exec();
  }

  public async recalculateOfferRating(offerId: string): Promise<void> {
    const [result] = await this.commentModel.aggregate([
      { $match: { offerId: new Types.ObjectId(offerId) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    const rating = result?.avgRating ?? 0;
    const commentCount = result?.count ?? 0;

    await this.offerModel
      .findByIdAndUpdate(offerId, { rating, commentCount })
      .exec();
  }
}
