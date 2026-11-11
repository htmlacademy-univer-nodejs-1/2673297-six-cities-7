import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { FavoriteService } from './favorite-service.interface.js';
import { FavoriteEntity } from './favorite.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { Component } from '../component.enum.js';
import { SortType } from '../sort-type.enum.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async add(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.updateOne(
      { userId, offerId },
      { $setOnInsert: { userId, offerId } },
      { upsert: true },
    ).exec();
  }

  public async remove(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ userId, offerId }).exec();
  }

  public async findByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const favorites = await this.favoriteModel.find({ userId }).exec();
    const offerIds = favorites.map((f) => f.offerId);

    return this.offerModel
      .find({ _id: { $in: offerIds } })
      .sort({ createdDate: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async exists(userId: string, offerId: string): Promise<boolean> {
    return (await this.favoriteModel.exists({ userId, offerId })) !== null;
  }
}
